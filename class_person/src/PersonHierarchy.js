import React from "react";


class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

 
class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }

  displayInfo() {
    return `${super.displayInfo()}, Course: ${this.course}`;
  }
}

// Subclass: Teacher
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  displayInfo() {
    return `${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

 
const PersonHierarchy = () => {
  const student1 = new Student("Mohan", 19, "Computer Science");
  const teacher1 = new Teacher("Dr. Rajat Kumar", 40, "Mathematics");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Person Class Hierarchy Example</h2>

      <h3>Student Details:</h3>
      <p>{student1.displayInfo()}</p>

      <h3>Teacher Details:</h3>
      <p>{teacher1.displayInfo()}</p>
    </div>
  );
};

export default PersonHierarchy;
