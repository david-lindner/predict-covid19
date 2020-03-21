function updateVariables(contacts_per_person_per_day, infection_rate_per_contact,
   population_size, seniors, students, household, social_distancing, handwashing, schools_closed, risk_groups_isolated, quarantine, masks) {

   var student_ratio = students / population_size;
   var senior_ratio = seniors / population_size;

   if (social_distancing) {
      contacts_per_person_per_day = household + (contacts_per_person_per_day - household) * 0.5;
   }
   if (handwashing) {
      infection_rate_per_contact = infection_rate_per_contact * 0.84 * 0.75 + infection_rate_per_contact * 0.25;
   }
   if (schools_closed) {
      contacts_per_person_per_day = (1 - student_ratio) * contacts_per_person_per_day + student_ratio * contacts_per_person_per_day * 0.5;
   }
   if (risk_groups_isolated) {
      contacts_per_person_per_day = (1 - 0.9 * senior_ratio) * contacts_per_person_per_day + senior_ratio * 0.9 * household;
   }
   if (quarantine) {
      contacts_per_person_per_day = contacts_per_person_per_day * 0.1 + household * 0.9;
   }
   if (masks) {
      infection_rate_per_contact = infection_rate_per_contact * 0.32 * 0.75 + infection_rate_per_contact * 0.25;
   }

   return [contacts_per_person_per_day, infection_rate_per_contact];
}
