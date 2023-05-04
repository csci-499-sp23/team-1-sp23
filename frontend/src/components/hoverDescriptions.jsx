import React from "react";

const hoverDescriptions = {
    'Fully Accessible': {
      description: `A school with all of the key accessible elements 
      (entrances, exits, bathrooms, etc.) that meet ADA standards and that are located on an accessible route. 
      Additional features such as lowered drinking fountains, door hardware, 
      etc. are present throughout the building.`,
    },
    'Partially Accessible': {
      description: `A school with some but not all of the key accessible elements that meet ADA standards,
      and/or a school with some key accessible elements located on a non-accessible route.`,
    },
    'Not Accessible': {
      description: `A school with none of the key accessible elements meeting ADA standards.`,
    },
    'FreeReducedLunch': {
        description: `Percentage of students who come from families that live 
        below the federal poverty line at this school. This includes both students 
        who are eligible for free or reduced-price lunch.`
    },
    'economicIndex': {
        description: `The economic need index estimates the percentage of students facing economic 
        hardship, based on their eligibility for free or reduced-price lunch along with other factors
        such as homelessness, foster care, and limited English proficiency.`
    },
    'ELLPrograms': {
        description: `ELL programs are designed to support students who are learning English as a second 
        language, and may include different levels of support and instruction depending on the needs of the 
        student. `
    },
    'RegentsDescrip':{
        description:  `The New York State (NYS) Regents are a set of standardized exams that are administered 
        to high school students in New York State. The Regents exams are used to assess students' mastery of 
        the New York State Learning Standards, which are a set of standards that define what students should 
        know and be able to do in each subject area. In order to graduate from high school in New York State, 
        students must earn a certain number of credits in specific subject areas and pass corresponding Regents exams.`
    },
    'LOTEDescrip':{
        description: `LOTE exams in New York State (NYS) are standardized exams that assess students' proficiency in a 
        language other than English (LOTE). The term "LOTE" typically refers to foreign languages such as Spanish, French, 
        Chinese, and Italian, among others. In order to graduate from high school in NYS, students must earn at least one LOTE 
        credit and pass a corresponding LOTE exam.`
    },
    'APDescrip':{
        description: `Advanced Placement (AP) exams are standardized exams developed and administered by the College Board that
         assess students' mastery of college-level coursework in a variety of subjects. Scoring well on AP exams can potentially 
         earn students college credit or advanced standing at participating colleges and universities. Additionally, success on AP 
         exams may also enhance students' college applications and demonstrate their academic readiness and potential to college 
         admissions officers.`
    },
    'SATDescrip':{
        description: `The SAT is a standardized test that assesses students' readiness for college-level work. It is administered by
        the College Board and consists of sections on Reading, Writing and Language, and Math. Scores on the SAT are often used by colleges
         and universities as part of their admissions process.`
    },
  };
  
  export default hoverDescriptions;
  