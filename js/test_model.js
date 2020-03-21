var sir = require("./sir_model");

var population_size = 83042200;
var contacts_per_person_per_day = 8;
var infection_rate_per_contact = 0.06;
var days_infectious = 5;
var infected_today = 15160;
var infected_two_weeks_ago = 653;
var timehorizon = 150;

var result = sir.model(population_size, contacts_per_person_per_day, infection_rate_per_contact,
                    days_infectious, infected_today, infected_two_weeks_ago, timehorizon);

console.log(result[0]);
console.log(result[1]);
console.log(result[2]);
