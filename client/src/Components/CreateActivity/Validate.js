export function validate(input) {
    let error = {};

    // <------- Validations NAME ------->

    if (!input.name) {
        error.name = "Name is required.";
    }
    else if (!/(?=^.{5,100}$)/i.test(input.name)) { //Min 5 max 100
        error.name = "Title needs 5 characters or more";
        if (!/^[A-Z ]+$/i.test(input.name)) {
            error.name = 'No numbers, symbols or special characters are accepted';
        }
    }
    else if (!/^[A-Z ]+$/i.test(input.name)) { //No acepta Simbolos
        error.name = 'No numbers, symbols or special characters are accepted';
    }

    // <------- Validations difficult - Countries - Season ------->

    if (!input.difficult) {
        error.difficult = "Difficult is required.";
    }

    if (input.duration <= 0) {
        error.duration = "Duration is required.";
    }
    if(!input.season){
        error.season = "Season is required.";
    }
    if(!input.Country){
        error.Country = "Country is required.";
    }
    
    return error;
}