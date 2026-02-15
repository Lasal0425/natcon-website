'use client';

import { useState } from 'react';

interface Project {
  roomNo: string;
  occupants: { name: string; entity: string; phoneNo: string }[];
  gender: string;
  keyHolder: string;
}

const PROJECTS: Project[] = [
  {
    roomNo: "236",
    occupants: [
      { name: "Lakshitha Wijethunga", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Uditha Ranasinghe", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Linal Hansana", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Lakshitha Wijethunga",
  },
  {
    roomNo: "237",
    occupants: [
      { name: "Mahima Yasas", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Tharuka Gunarathne", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Dulain Jayasumana", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Mahima Yasas",
  },
  {
    roomNo: "238",
    occupants: [
      { name: "Chelaka Wijesekara", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Dilum Kalubowila", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Yenul Perera", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Chelaka Wijesekara",
  },
  {
    roomNo: "239",
    occupants: [
      { name: "Godfri John", entity: "CC", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Godfri John",
  },
  {
    roomNo: "240",
    occupants: [
      { name: "Mohamad Shaahid", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Yehan Namarathna", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Vismitha Gunasekara", entity: "NSBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Mohamad Shaahid",
  },
  {
    roomNo: "241",
    occupants: [
      { name: "Lahiru Dinusha", entity: "Kandy", phoneNo: "xxxxxxxxxx" },
      { name: "Sudeera Jayarathna", entity: "Kandy", phoneNo: "xxxxxxxxxx" },
      { name: "Vihanga Deemantha", entity: "Kandy", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Lahiru Dinusha",
  },
  {
    roomNo: "242",
    occupants: [
      { name: "Divya Dulanjali", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Pamali Amesha", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Heshani Navodya", entity: "NIBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Divya Dulanjali",
  },
  {
    roomNo: "243",
    occupants: [
      { name: "Sadavi Kuruwitaarachchige", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Viduni Kongahage", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Navodya Thilini", entity: "CN", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Sadavi Kuruwitaarachchige",
  },
  {
    roomNo: "244",
    occupants: [
      { name: "Mahendri Hemachandra", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Chamodya Bandarawatta", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Subodha Emanuwel", entity: "Wayamba", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Mahendri Hemachandra",
  },
  {
    roomNo: "245",
    occupants: [
      { name: "Aamina Riffath", entity: "Rajarata", phoneNo: "xxxxxxxxxx" },
      { name: "Kavindhya Malshani", entity: "Rajarata", phoneNo: "xxxxxxxxxx" },
      { name: "Amoda Fernando", entity: "Rajarata", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Aamina Riffath",
  },
  {
    roomNo: "250",
    occupants: [
      { name: "Minangi Jayasinghe", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Savithmi Minsaree", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Poojanee Weerasena", entity: "CS", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Minangi Jayasinghe",
  },
  {
    roomNo: "251",
    occupants: [
      { name: "Shenan Nathaniel", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Sasith Vishwa Darshana", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Vishwa Kaushalya", entity: "CS", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Shenan Nathaniel",
  },
  {
    roomNo: "252",
    occupants: [
      { name: "Sakila Thejana", entity: "Rajarata", phoneNo: "xxxxxxxxxx" },
      { name: "Bhanuka Induwara", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Amzal Foumi", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Sakila Thejana",
  },
  {
    roomNo: "253",
    occupants: [
      { name: "Kalindu De Silva", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Mevinu Liyanage", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Dinil Hansara", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Kalindu De Silva",
  },
  {
    roomNo: "254",
    occupants: [
      { name: "Imindu Jayasekara", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Yeshan KP", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Kavindu Prabhash", entity: "Wayamba", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Imindu Jayasekara",
  },
  {
    roomNo: "255",
    occupants: [
      { name: "Ravinesh Perera", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Harith Sandundeniya", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Sabeelur Rashaad Mohamed Razeen", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Ravinesh Perera",
  },
  {
    roomNo: "256",
    occupants: [
      { name: "Janindu Hasanka", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Rumeth Amarasiri", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Supun Jayasinghe", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Janindu Hasanka",
  },
  {
    roomNo: "257",
    occupants: [
      { name: "Saneesha Dulhara", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Yuneth Withanachchi", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Dishan Bashitha", entity: "CS", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Saneesha Dulhara",
  },
  {
    roomNo: "258",
    occupants: [
      { name: "Kavindu Madushan", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Vihan Hettiarachchi", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Dileepa Bandara", entity: "USJ", phoneNo: "xxxxxxxxxx" },
    ],
    gender: "Male",
    keyHolder: "Kavindu Madushan",
  },
  {
    roomNo: "259",
    occupants: [
      { name: "Dahamya Vinradi", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Fathima Isthikar", entity: "Kandy", phoneNo: "xxxxxxxxxx" },
      { name: "Jayashni Rodrigo", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Dahamya Vinradi",
  },
  {
    roomNo: "260",
    occupants: [
      { name: "Harithanjali Weerakkody", entity: "Rajarata", phoneNo: "xxxxxxxxxx" },
      { name: "Umayangana Madurawala", entity: "CN", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Harithanjali Weerakkody",
  },
  {
    roomNo: "261",
    occupants: [
      { name: "Venuki Wijeratne", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Nilma Malkini", entity: "CN", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Venuki Wijeratne",
  },
  {
    roomNo: "262",
    occupants: [
      { name: "Senaya Dharmadasa", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Kethaki Wijesooriya", entity: "CN", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Senaya Dharmadasa",
  },
  {
    roomNo: "263",
    occupants: [
      { name: "Dinuki Masakorala", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Lakshajini Ruparajan", entity: "Kandy", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Dinuki Masakorala",
  },
  {
    roomNo: "264",
    occupants: [
      { name: "Rashmika Guruge", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Gayani Malalgoda", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Savandi Liyanayapa", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Rashmika Guruge",
  },
  {
    roomNo: "265",
    occupants: [
      { name: "Leeza Gilbert", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Sanumi Nimethra", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Leeza Gilbert",
  },
  {
    roomNo: "266",
    occupants: [
      { name: "Nadali Hansani", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Samadhi Hemantha", entity: "CN", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Nadali Hansani",
  },
  {
    roomNo: "267",
    occupants: [
      { name: "Dineth Wijesuriya", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Rashdhan Mohomed", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Ishan Balasooriya", entity: "CS", phoneNo: "xxxxxxxxxx" },
    ],
    gender: "Male",
    keyHolder: "Dineth Wijesuriya",
  },
  {
    roomNo: "268",
    occupants: [
      { name: "Thisara Kawinda", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Anuja Mahamalage", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Tharindu Widanagama", entity: "NIBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Thisara Kawinda",
  },
  {
    roomNo: "269",
    occupants: [
      { name: "Dulen Withanage", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Damith Wijemanna", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Shamli Bin Jameel", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Srimuralitharan Elilavan", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Dulen Withanage",
  },
  {
    roomNo: "270",
    occupants: [
      { name: "Raj Waidyasekara", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Thisara Randam", entity: "Rajarata", phoneNo: "xxxxxxxxxx" },
      { name: "Thumal Kariyapperuma", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Bawantha Jayanath", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Raj Waidyasekara",
  },
  {
    roomNo: "271",
    occupants: [
      { name: "Nadun Weerakkody", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Tilan Eranga", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Balamurali Pakeetharan", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Induwara Lakthila", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Nadun Weerakkody",
  },
  {
    roomNo: "272",
    occupants: [
      { name: "Mihan Ekanayake", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Benjamin Gnanapragasam", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Methal Abeywickrama", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Sandaru Dissanayake", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Mihan Ekanayake",
  },
  {
    roomNo: "273",
    occupants: [
      { name: "Adithya Kalhan", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Janindu Wijesinghe", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Aflal Zahreen", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Manindu Upek", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Adithya Kalhan",
  },
  {
    roomNo: "274",
    occupants: [
      { name: "Jemima Mohamed", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Kasundi Sanara", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "A.B.Shishanika Kavindya", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Subanki Subaschandran", entity: "NIBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Jemima Mohamed",
  },
  {
    roomNo: "275",
    occupants: [
      { name: "Christy Binni", entity: "Kandy", phoneNo: "xxxxxxxxxx" },
      { name: "Uthpala Kalupathirana", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Puravi Kulathunga", entity: "CC", phoneNo: "xxxxxxxxxx" },
      { name: "Minethma Wickramasinghe", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Christy Binni",
  },
  {
    roomNo: "276",
    occupants: [
      { name: "Manisha Selvanayagam", entity: "CC", phoneNo: "xxxxxxxxxx" },
      { name: "Minduli Atapattu", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Methya Weeraratne", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Devmi Galagedara", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Manisha Selvanayagam",
  },
  {
    roomNo: "277",
    occupants: [
      { name: "Pavani Attanayake", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Sanduni Wijekoon", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Sehansa Palliyaguru", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Disandi Sandithna", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Pavani Attanayake",
  },
  {
    roomNo: "278",
    occupants: [
      { name: "Savidya Wijayakulasooriya", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Nethmi Maduhara", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Maheesha Deraniyagala", entity: "CC", phoneNo: "xxxxxxxxxx" },
      { name: "Pethara Ranasinghe", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Savidya Wijayakulasooriya",
  },
  {
    roomNo: "279",
    occupants: [
      { name: "Dinithi Thilakaratne", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Tracey Johnson", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Chamie Ranawakaarachchi", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Pumuthu Weerakoon", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Dinithi Thilakaratne",
  },
  {
    roomNo: "280",
    occupants: [
      { name: "Chamlika Wijesinghe", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Bumini Uyanahewa", entity: "CC", phoneNo: "xxxxxxxxxx" },
      { name: "Kithmini Hettiarachchi", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Navapriyah Krishnan", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Chamlika Wijesinghe",
  },
  {
    roomNo: "281",
    occupants: [
      { name: "Amasha Fernando", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Dinidi Senanayake", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "CHITHMI NAVODYA", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Upetha Ariyarathne", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Amasha Fernando",
  },
  {
    roomNo: "282",
    occupants: [
      { name: "Kavindya Bandara", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Sachini Rajapaksha", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Thehasa Hewavitharana", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Pumudi Peduruarachchi", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Kavindya Bandara",
  },
  {
    roomNo: "283",
    occupants: [
      { name: "Madhunishaa Yogendran", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Shimasha Manawadu", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Sadeeshie Ravindya", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Gimhani Jayasekara", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Madhunishaa Yogendran",
  },
  {
    roomNo: "284",
    occupants: [
      { name: "Tharuka Fernando", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Navoda Sandamini", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Kavini Wijesiriwardena", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Limantha Adikari", entity: "NSBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Tharuka Fernando",
  },
  {
    roomNo: "285",
    occupants: [
      { name: "H.A.Promodi maheshika", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Oshadi Liyanage", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Sayumi Ekanayake", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Duwasha Algama", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "H.A.Promodi maheshika",
  },
  {
    roomNo: "286",
    occupants: [
      { name: "Shinthurie Markandakuganathan", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Nirmani Weerakoon", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Anjalee perera", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Malithi Dharmasiri", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Shinthurie Markandakuganathan",
  },
  {
    roomNo: "287",
    occupants: [
      { name: "Amani Jayasekara", entity: "Rajarata", phoneNo: "xxxxxxxxxx" },
      { name: "Hansika Bandara", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Bavisyanthe Shanmugadas", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Amani Jayasekara",
  },
  {
    roomNo: "288",
    occupants: [
      { name: "Vihangi Ranaweera", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Zahra Bathool", entity: "Kandy", phoneNo: "xxxxxxxxxx" },
      { name: "Imaya Jayarathna", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Vihangi Ranaweera",
  },
  {
    roomNo: "289",
    occupants: [
      { name: "Thisuni Kuruwitaarachchige", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Nayanalochana Handapangoda", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Mithuni Nadeesha", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Thisuni Kuruwitaarachchige",
  },
  {
    roomNo: "290",
    occupants: [
      { name: "Nawoda Uththarani", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Sachini Gunawardhana", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Monali Edirisinghe", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Nawoda Uththarani",
  },
  {
    roomNo: "291",
    occupants: [
      { name: "Methara Wanigasinghe", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Shahnaas Rafi", entity: "Kandy", phoneNo: "xxxxxxxxxx" },
      { name: "Gayathmee Perera", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Methara Wanigasinghe",
  },
  {
    roomNo: "292",
    occupants: [
      { name: "Raveesha Bandara", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Dilthara de Silva", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Melanie Dassanayake", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Raveesha Bandara",
  },
  {
    roomNo: "293",
    occupants: [
      { name: "Dinithi Pamudika", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Imandi Amalna", entity: "Rajarata", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Dinithi Pamudika",
  },
  {
    roomNo: "294",
    occupants: [
      { name: "Sachinthani Ketakumbura", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Vinuli Gunaratne", entity: "NSBM", phoneNo: "xxxxxxxxxx" },
      { name: "Methpani Rathnayake", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Sachinthani Ketakumbura",
  },
  {
    roomNo: "295",
    occupants: [
      { name: "Nethuli Paranavidana", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "ANUKI VIMAYA ADIKARI", entity: "Rajarata", phoneNo: "xxxxxxxxxx" },
      { name: "Dinadi Jayathilaka", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Nethuli Paranavidana",
  },
  {
    roomNo: "296",
    occupants: [
      { name: "Imelsha Fernando Aththachchi", entity: "Wayamba", phoneNo: "xxxxxxxxxx" },
      { name: "Samindi Keel", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Samithri Miulandi Gunasekara", entity: "NIBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Imelsha Fernando Aththachchi",
  },
  {
    roomNo: "297",
    occupants: [
      { name: "Samadhi Wadithya", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Omali Weerasinghe", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Hashini Hapuarachchi", entity: "NIBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Samadhi Wadithya",
  },
  {
    roomNo: "298",
    occupants: [
      { name: "Dinuri Geeganage", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Ayshah Shaheed", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Hani Rudhthiya", entity: "NIBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Dinuri Geeganage",
  },
  {
    roomNo: "299",
    occupants: [
      { name: "Nethma Dewmini", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Senugi Mendis", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Shenise Pronk", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Female",
    keyHolder: "Nethma Dewmini",
  },
  {
    roomNo: "300",
    occupants: [
      { name: "Mishara Athukorala", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Ravindu Jayasekara", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Savinda Sithum", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Mishara Athukorala",
  },
  {
    roomNo: "301",
    occupants: [
      { name: "Desandu Wanniarachchi", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Vishal Hadharshan", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Thedapun Wanninaika", entity: "NSBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Desandu Wanniarachchi",
  },
  {
    roomNo: "302",
    occupants: [
      { name: "Nikila Silva", entity: "Kandy", phoneNo: "xxxxxxxxxx" },
      { name: "Mathumithan Arulanantham", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Vabeeshan Vasantharajan", entity: "NIBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Nikila Silva",
  },
  {
    roomNo: "303",
    occupants: [
      { name: "Yohan Wickramasinghe", entity: "SLIIT", phoneNo: "xxxxxxxxxx" },
      { name: "Hiran Samahon", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Ryan Fonseka", entity: "NIBM", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Yohan Wickramasinghe",
  },
  {
    roomNo: "304",
    occupants: [
      { name: "Oshan Indusara", entity: "NIBM", phoneNo: "xxxxxxxxxx" },
      { name: "Gayan Kanchana", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Chamin Jayasoma", entity: "USJ", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Oshan Indusara",
  },
  {
    roomNo: "305",
    occupants: [
      { name: "Deveen Chandira", entity: "CS", phoneNo: "xxxxxxxxxx" },
      { name: "Nirmal Dilip", entity: "Ruhuna", phoneNo: "xxxxxxxxxx" },
      { name: "Kokulan Kugathasan", entity: "SLIIT", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Deveen Chandira",
  },
  {
    roomNo: "306",
    occupants: [
      { name: "Dinuka Wimalagunasekara", entity: "USJ", phoneNo: "xxxxxxxxxx" },
      { name: "Ashfaaq Ashrak", entity: "CN", phoneNo: "xxxxxxxxxx" },
      { name: "Thisuka De Silva", entity: "CS", phoneNo: "xxxxxxxxxx" }
    ],
    gender: "Male",
    keyHolder: "Dinuka Wimalagunasekara",
  },
];




export default function RoomSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setNotFound(false);
    setSearchResult(null);

    if (term.trim() === '') return;

    const foundRoom = PROJECTS.find(room =>
      room.occupants.some(occupant =>
        occupant.name.toLowerCase().includes(term.toLowerCase())
      )
    );

    if (foundRoom) setSearchResult(foundRoom);
    else setNotFound(true);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResult(null);
    setNotFound(false);
  };

  return (
    <section
      className="relative z-20 py-16 px-6 md:px-12 min-h-screen font-mono"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 border-2 border-natcon-green hover:border-natcon-red 
                        rounded-2xl p-8 shadow-xl transition-all duration-300 ease-in-out hover:scale-105">
          <h1 className="text-4xl font-extrabold text-white mb-4 text-center">Room Allocation</h1>
          <p className="text-gray-300 text-center mb-8">
            Enter your name to find your room, roommates and keyholder
          </p>

          {/* Search Input */}
          <div className="relative mb-10">
            <input
              type="text"
              placeholder="Enter name to search..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-800 border-2 border-natcon-green rounded-xl text-white 
                         focus:outline-none focus:border-natcon-red transition-all"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-natcon-red"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchResult && (
            <div className="bg-gray-800 border-2 border-natcon-green rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-natcon-green">Room {searchResult.roomNo}</h2>
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${searchResult.gender === 'Male'
                    ? 'bg-natcon-blue/50 text-blue-300'
                    : 'bg-natcon-red/20 text-natcon-red'
                  }`}>
                  {searchResult.gender}
                </span>
              </div>

              {/* Key Holder */}
              <div className="mb-6 p-4 bg-gray-900 border-2 border-natcon-orange rounded-xl flex items-center gap-3">
                <svg className="h-6 w-6 text-natcon-yellow" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-xs text-natcon-yellow font-semibold">Key Holder</p>
                  <p className="text-lg font-bold text-white flex items-center gap-2">
                    {searchResult.keyHolder}
                  </p>
                </div>
              </div>

              {/* Roommates */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">
                  Occupants ({searchResult.occupants.length})
                </h3>
                <div className="space-y-3">
                  {searchResult.occupants.map((occupant, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border transition-all ${occupant.name.toLowerCase().includes(searchTerm.toLowerCase())
                          ? 'bg-natcon-red border-natcon-red text-white'
                          : 'bg-gray-900 border-gray-700 text-gray-200'
                        }`}
                    >
                      <div className="font-medium">{occupant.name}</div>
                      <div className="text-sm">
                        <span className="font-semibold">Entity:</span> {occupant.entity} |{" "}
                        <span className="font-semibold">Phone:</span> {occupant.phoneNo}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Not Found */}
          {notFound && searchTerm && (
            <div className="bg-red-900 border-2 border-red-600 rounded-xl p-6 text-center text-white">
              <p className="text-xl font-semibold">No results found</p>
              <p className="text-gray-300 text-sm mt-1">
                No one with the name {searchTerm} was found in the room allocation.
              </p>
            </div>
          )}

          {/* Initial State */}
          {!searchTerm && !searchResult && !notFound && (
            <div className="text-center py-12 text-gray-400">
              <p>Start typing a name to search</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

