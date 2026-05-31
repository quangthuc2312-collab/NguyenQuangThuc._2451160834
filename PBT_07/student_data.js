const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" }
];

let countGioi = 0;
let countKha = 0;
let countTrungBinh = 0;
let countYeu = 0;
let highest = null;
let lowest = null;
let totalMath = 0;
let totalPhysics = 0;
let totalCs = 0;
let totalM = 0;
let totalF = 0;
let countM = 0;
let countF = 0;

console.log("| STT | Tên | TB | Xếp loại |");
console.log("|-----|-----|----|----------|");

for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let avg = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
    let rank = "";

    if (avg >= 8) {
        rank = "Giỏi";
        countGioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        countKha++;
    } else if (avg >= 5) {
        rank = "Trung bình";
        countTrungBinh++;
    } else {
        rank = "Yếu";
        countYeu++;
    }

    s.avg = avg;
    s.rank = rank;

    if (highest === null || avg > highest.avg) {
        highest = s;
    }

    if (lowest === null || avg < lowest.avg) {
        lowest = s;
    }

    totalMath += s.math;
    totalPhysics += s.physics;
    totalCs += s.cs;

    if (s.gender === "M") {
        totalM += avg;
        countM++;
    } else {
        totalF += avg;
        countF++;
    }

    console.log("| " + (i + 1) + " | " + s.name + " | " + avg.toFixed(1) + " | " + rank + " |");
}

console.log("");
console.log("Số SV Giỏi: " + countGioi);
console.log("Số SV Khá: " + countKha);
console.log("Số SV Trung bình: " + countTrungBinh);
console.log("Số SV Yếu: " + countYeu);
console.log("Cao nhất: " + highest.name + " - " + highest.avg.toFixed(1));
console.log("Thấp nhất: " + lowest.name + " - " + lowest.avg.toFixed(1));
console.log("TB môn Toán: " + (totalMath / students.length).toFixed(1));
console.log("TB môn Vật lý: " + (totalPhysics / students.length).toFixed(1));
console.log("TB môn Tin: " + (totalCs / students.length).toFixed(1));
console.log("TB nam: " + (totalM / countM).toFixed(1));
console.log("TB nữ: " + (totalF / countF).toFixed(1));
