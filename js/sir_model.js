var odex = require("./odex");

function sirModel (population_size, contacts_per_person_per_day, infection_rate_per_contact,
                    days_infectious, infected_today, infected_two_weeks_ago, timehorizon) {
   var initially_infected = infected_today - infected_two_weeks_ago;
   var initially_recovered = infected_two_weeks_ago;
   var initially_susceptible = population_size - initially_infected - initially_recovered;

   var beta = infection_rate_per_contact * contacts_per_person_per_day;
   var gamma = 1 / days_infectious;
   var R0 = beta / gamma;

   // y[0] = S, y[1] = I, y[2] = R
   var LotkaVolterra = function(beta, gamma, N) {
      return function(x, y) {
         return [
            -beta * y[0] * y[1] / N,
            beta * y[0] * y[1] / N - gamma * y[1],
            gamma * y[1]
         ];
      };
   };
   s = new odex.Solver(3);

   var susceptible = [];
   var infected = [];
   var recovered = [];

   var t;
   for (t = 1; t < timehorizon; t++) {
      sol = s.solve(LotkaVolterra(beta, gamma, population_size), 0,
         [initially_susceptible, initially_infected, initially_recovered],
         t).y;
      susceptible.push(sol[0]);
      infected.push(sol[1]);
      recovered.push(sol[2]);
   }

   return [susceptible, infected, recovered];
}

// export for node
exports.model = sirModel;
// export for browserify
window.sirModel = sirModel;
