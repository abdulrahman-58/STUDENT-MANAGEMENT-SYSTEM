#! /usr/bin/env node
import inquirer from "inquirer";

class student {
  id: string;
  name: string;
  courseEnrolled: string[];
  feeAmount: number;

  constructor(
    id: string,
    name: string,
    courseEnrolled: string[],
    feeAmount: number
  ) {
    this.id = id;
    this.name = name;
    this.courseEnrolled = courseEnrolled;
    this.feeAmount = feeAmount;
  }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students: student[] = [];

do {
  let action = await inquirer.prompt({
    type: "list",
    name: "ans",
    message: "Please select an option",
    choices: ["Enroll a student", "Show student status"],
  });
  if (action.ans === "Enroll a student") {
    let studentName = await inquirer.prompt({
      type: "input",
      name: "ans",
      message: "Please enter your name: ",
    });
    let trimStudentName = studentName.ans.trim().toLowerCase();
    let studentNameCheck = students.map((obj) => obj.name);
    if (studentNameCheck.includes(trimStudentName) === false) {
      if (trimStudentName !== "") {
        baseId++;
        studentId = "STID" + baseId;

        console.log("\nYour account has been created");
        console.log(`Welcome ${trimStudentName}!`);

        let course = await inquirer.prompt({
          type: "list",
          name: "ans",
          message: "Please select a course",
          choices: ["IT Basics", "English Basic To Advance", "IT Advance"],
        });
        let courseFees = 0;
        switch (course.ans) {
          case "IT Basics":
            courseFees = 2500;
            break;
        }
        switch (course.ans) {
          case "English Basic To Advance":
            courseFees = 5000;
            break;
        }
        switch (course.ans) {
          case "IT Advance":
            courseFees = 10000;
            break;
        }
        let courseConfirm = await inquirer.prompt({
          type: "confirm",
          name: "ans",
          message: "Do you want to enroll in this course?",
        });
        if (courseConfirm.ans === true) {
          let Student = new student(
            studentId,
            trimStudentName,
            [course.ans],
            courseFees
          );
          students.push(Student);
          console.log("You have enrolled in this course");
        }
      } else {
        console.log("Invalid name");
      }
    } else {
      console.log("This name is already exists");
    }
  } else if (action.ans === "Show student status") {
    if (students.length !== 0) {
      let studentNamesCheck = students.map((e) => e.name);
      let selectedStudent = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select name",
        choices: studentNamesCheck,
      });
      let foundStudent = students.find(
        (Student) => Student.name === selectedStudent.ans
      );
      console.log("Student Information");
      console.log(foundStudent);
      console.log("\n");
    } else {
      console.log("Record is empty");
    }
  }
  let userConfirm = await inquirer.prompt({
    type: "confirm",
    name: "ans",
    message: "Do you want to continue?",
  });
  if (userConfirm.ans === false) {
    continueEnrollment = false;
  }
} while (continueEnrollment);
