import fs from "fs";
import { RootData } from "./interface/interfaceData";
const textIntptr: string = fs.readFileSync("json/input.json", "utf-8");
const data: RootData = JSON.parse(textIntptr);
const text: string = fs.readFileSync("txt/append.txt", "utf-8");
console.log(text);

data.name = "Ngo Nhat Huy";
data.address.city = "Binh Phuoc";
data.address.street = "Loc Ninh";
data.address.country = "Viet Nam";
data.email = "nnh2xn@gmail.com";
data.day = new Date().getDate();
if ((data.isEmployed = true)) {
  data.isEmployed = false;
}
try {
  fs.writeFileSync("data/dataUser/userHuy.json", JSON.stringify(data));
  console.log("Success");
} catch (error) {
  console.log("Bug");
}
