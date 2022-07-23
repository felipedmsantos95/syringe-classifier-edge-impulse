
export class VaccinationData {
    constructor(patient, nurse, vaccineType, vaccineLot){
        this.patient = patient 
        this.nurse = nurse 
        this.vaccineType = vaccineType 
        this.vaccineLot = vaccineLot
        this.date = new Date()
    }
}
