
from fastapi import FastAPI,Path,HTTPException,Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware          # ← ADD
from pydantic import BaseModel,Field,computed_field
from typing import Annotated,Literal,Optional  

import json
app = FastAPI()  


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

 #--------------------------------------------------------------------------------------------------------------------------

# Define the Patient model with validation and computed fields

class Patient(BaseModel):
    id: Annotated[str,Field(..., description="The unique ID of the patient", example="P0001")]
    name:  Annotated[str,Field(..., description="The name of the patient", example="John Doe")]
    city:  Annotated[str,Field(..., description="The city where the patient resides", example="New York")]
    age:  Annotated[int,Field(...,gt=0, description="The age of the patient", example=30)]
    gender:  Annotated[Literal["Male", "Female", "Other"],Field(..., description="The gender of the patient", example="Male")] 
    height: Annotated[float,Field(...,gt=0, description="The height of the patient in centimeters", example=175.5)]
    weight: Annotated[float,Field(...,gt=0, description="The weight of the patient in kilograms", example=70.2)]
    


    @computed_field
    @property
    def bmi(self) -> float:
        height_in_meters = self.height / 100
        bmi_value = self.weight / (height_in_meters ** 2)
        return round(bmi_value, 2)
    
   
    @computed_field
    @property   
    def verdict(self) -> str:
        if self.bmi < 18.5:
            return "Underweight"
        elif 18.5 <= self.bmi < 25:
            return "Normal"
        elif 25 <= self.bmi < 30:
            return "Overweight"
        else:
            return "Obese"
    
   
    


#--------------------------------------------------------------------------------------------------------------------------

# Define the PatientUpdate model for updating patient information with optional fields


class PatientUpdate(BaseModel):

    name: Annotated[Optional[str],Field(default=None, description="The name of the patient", example="John Doe")]
    city: Annotated[Optional[str],Field(default=None, description="The city where the patient resides", example="New York")]
    age: Annotated[Optional[int],Field(default=None,gt=0, description="The age of the patient", example=30)]
    gender:  Annotated[Optional[Literal["Male", "Female", "Other"]],Field(default=None, description="The gender of the patient", example="Male")] 
    height: Annotated[Optional[float],Field(default=None,gt=0, description="The height of the patient in centimeters", example=175.5)]
    weight: Annotated[Optional[float],Field(default=None,gt=0, description="The weight of the patient in kilograms", example=70.2)]
    
#--------------------------------------------------------------------------------------------------------------------------

# Function to load patients from the JSON file

def load_patients():
    try:
        with open('patients.json', 'r') as f:
            data = json.load(f)
            if isinstance(data, dict):
                return data
            return {}
    except FileNotFoundError:
        return {}
    
    #--------------------------------------------------------------------------------------------------------------------------

# Function to save patients to the JSON file
  
def save_patients(patients):
        try:
            with open('patients.json', 'w') as f:
                    json.dump(patients, f, indent=4)    
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error saving patient data: {str(e)}")
        
    #--------------------------------------------------------------------------------------------------------------------------
@app.get("/health")
def health_check():
    return {"status": "healthy"}

    #--------------------------------------------------------------------------------------------------------------------------
@app.get("/patients")
def get_patients_paginated(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Records per page"),
    search: str = Query("", description="Search by name or city")
):
    patients = load_patients()
    items = list(patients.items())

    # Filter if search query provided
    if search:
        q = search.lower()
        items = [
            (id, p) for id, p in items
            if q in (p.get("name","")).lower()
            or q in (p.get("city","")).lower()
            or q in id.lower()
            or q in (p.get("gender","")).lower()
        ]

    total   = len(items)
    pages   = max(1, -(-total // limit))   # ceiling division
    start   = (page - 1) * limit
    end     = start + limit
    chunk   = dict(items[start:end])

    return {
        "data":        chunk,
        "total":       total,
        "page":        page,
        "limit":       limit,
        "total_pages": pages,
        "has_next":    page < pages,
        "has_prev":    page > 1
    }
#----------------------------------------------------------------------------------------

## home route to check if the API is working

@app.get("/")
def home():
    return {'message': "Patient Management System API "}

#--------------------------------------------------------------------------------------------------------------------------

## about route to provide information about the API

@app.get("/about")
def about():
    return {'message': "This is a simple API for managing patient records in a healthcare system. It allows you to create, read, update, and delete patient information."}

#--------------------------------------------------------------------------------------------------------------------------

# route to view all patients in the system

@app.get("/view_patients")
def view_patients():
    patients = load_patients()
    return patients

#--------------------------------------------------------------------------------------------------------------------------

# route to view a specific patient by their ID

@app.get('/patient/{patient_id}')
def get_patient(patient_id: str=Path(..., description="The ID of the patient to retrieve",example="P0001")):
    patients = load_patients()
    if patient_id in patients:
        return patients[patient_id]
    raise HTTPException(status_code=404, detail="Patient not found") 

#--------------------------------------------------------------------------------------------------------------------------

# route to view a specific field of a patient by their ID

@app.get('/patient/{patient_id}/{field}')
def get_patient_field(patient_id: str=Path(..., description="The ID of the patient to retrieve",example="P0001"),field: str=Path(..., description="The field to retrieve",example="name")):
    patients = load_patients()
    if patient_id in patients:
        patient = patients[patient_id]
        if field in patient:
            return {field: patient[field]}
        raise HTTPException(status_code=404, detail=f"Field '{field}' not found for patient '{patient_id}'")
    raise HTTPException(status_code=404, detail="Patient not found")

#--------------------------------------------------------------------------------------------------------------------------

## route to sort patients based on a specific field and order

@app.get('/sort')
def sort_patients(sort_by: str = Query(..., description="The field to sort patients on the basis of height,weight or bmi", example="name"),
                  order:str = Query("asc", description="The order to sort patients, either 'asc' for ascending or 'desc' for descending", example="asc")
                  ):
    valid_sort_fields = [ 'height', 'weight', 'bmi']
    if sort_by not in valid_sort_fields:
        raise HTTPException(status_code=400, detail=f"Invalid sort field. Valid options are: {', '.join(valid_sort_fields)}")
    if order not in ['asc', 'desc']:
        raise HTTPException(status_code=400, detail="Invalid sort order. Valid options are: 'asc' or 'desc'")
    patients = load_patients()
    sorted_patients = sorted(patients.values(), key=lambda x: x.get(sort_by, 0), reverse=(order == 'desc'))
    return sorted_patients   


#--------------------------------------------------------------------------------------------------------------------------

# route to add a new patient to the system

@app.post('/add_patient')
def add_patient(patient: Patient):
    patients = load_patients()
    patient_id = patient.id
    if patient_id in patients:
        raise HTTPException(status_code=400, detail="Patient with this ID already exists")
    patients[patient_id] = patient.model_dump(exclude={'id'})

    save_patients(patients) 

    return JSONResponse(status_code=201, content={"message": "Patient added successfully", "patient_id": patient_id})


#--------------------------------------------------------------------------------------------------------------------------

# route to update an existing patient's information in the system


@app.put('/update_patient/{patient_id}')
def update_patient(patient_id: str=Path(..., description="The ID of the patient to  update",example="P0001"), patient_update: PatientUpdate=...):
    patients = load_patients()
    if patient_id not in patients:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    patient_data = patients[patient_id]
    
    update_data = patient_update.model_dump(exclude_unset=True)
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    for key, value in update_data.items():
      if key in patient_data:
        if value is not None:
            patient_data[key] = value
      else:
        raise HTTPException(status_code=400, detail=f"Invalid field '{key}' provided for update")
    
    if 'height' in update_data or 'weight' in update_data:
       patient_data['id'] = patient_id
       patient_pydanticObj = Patient(**patient_data)
       patient_data= patient_pydanticObj.model_dump(exclude={'id'})
    
    patients[patient_id] = patient_data
    save_patients(patients)
    
    return JSONResponse(status_code=200, content={"message": "Patient updated successfully", "patient_id": patient_id})


#--------------------------------------------------------------------------------------------------------------------------


# route to delete a patient from the system by their ID and reorder the remaining patient IDs to maintain a sequential order without gaps. For example, if patient P0002 is deleted, the remaining patients will be reordered to P0001, P0002, P0003, etc.

@app.delete("/delete_patient/{patient_id}")
def delete_patient(patient_id: str = Path(..., description="The ID of the patient to delete", example="P0001")):
    
    patients = load_patients()

    if patient_id not in patients:
        raise HTTPException(status_code=404, detail="Patient not found")

    # delete the patient
    del patients[patient_id]

    # reorder IDs
    reordered_patients = {}
    for i, (_, patient_data) in enumerate(patients.items(), start=1):
        new_id = f"P{i:04d}"
        reordered_patients[new_id] = patient_data

    save_patients(reordered_patients)

    return JSONResponse(
        status_code=200,
        content={
            "message": "Patient deleted and IDs reordered successfully",
            "deleted_id": patient_id
        }
    )


#--------------------------------------------------------------------------------------------------------------------------
