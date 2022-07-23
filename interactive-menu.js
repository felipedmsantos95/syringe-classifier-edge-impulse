//import { VaccinationData } from "./vaccination-data";
import inquirer from 'inquirer';


let menu = inquirer
            .prompt([
                {
                    name: 'patient',
                    message: 'Patient\'s name: '
                }
            ])


// console.log(menu.patient)