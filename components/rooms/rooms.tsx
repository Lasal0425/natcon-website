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
    roomNo: "207",
    occupants: [
      { name: "Hiran", entity: "CS", phoneNo: "763570108" },
      { name: "Aloka", entity: "NSBM", phoneNo: "720863052" },
      { name: "Suprajan", entity: "SLIIT", phoneNo: "704250286" },
      { name: "Ehaparan", entity: "Kandy", phoneNo: "759086904" },
    ],
    gender: "Male",
    keyHolder: "Hiran",
  },
  {
    roomNo: "208",
    occupants: [
      { name: "Vidushan", entity: "NIBM", phoneNo: "702380405" },
      { name: "Senitha", entity: "CC", phoneNo: "720411139" },
      { name: "Manula", entity: "SLIIT", phoneNo: "722995147" },
      { name: "Sansith", entity: "Kandy", phoneNo: "718693820" },
    ],
    gender: "Male",
    keyHolder: "Vidushan",
  },
  {
    roomNo: "209",
    occupants: [
      { name: "Pakeetharan", entity: "Wayamba", phoneNo: "771910998" },
      { name: "Irosh", entity: "Ruhuna", phoneNo: "703699241" },
      { name: "Sithika", entity: "SLLIT", phoneNo: "761971180" },
      { name: "Kisham", entity: "NSBM", phoneNo: "777822926" },
    ],
    gender: "Male",
    keyHolder: "Pakeetharan",
  },
  {
    roomNo: "210",
    occupants: [
      { name: "Benjamin", entity: "CN", phoneNo: "740553044" },
      { name: "Dihindu", entity: "CS", phoneNo: "706156856" },
      { name: "Vihanga", entity: "Kandy", phoneNo: "771141262" },

    ],
    gender: "Male",
    keyHolder: "Benjamin",
  },
  {
    roomNo: "211",
    occupants: [
      { name: "Nadun", entity: "SLIIT", phoneNo: "717439912" },
      { name: "Vihanga", entity: "CN", phoneNo: "765593394" },
      { name: "Vidath", entity: "CS", phoneNo: "743782228" },
      { name: "Dilka", entity: "Kandy", phoneNo: "779009261" },
    ],
    gender: "Male",
    keyHolder: "Nadun",
  },
  {
    roomNo: "212",
    occupants: [
      { name: "Kaushalya", entity: "Ruhuna", phoneNo: "710995515" },
      { name: "Chrishane", entity: "USJ", phoneNo: "770506452" },
      { name: "Alex", entity: "SLIIT", phoneNo: "706544700" },
      { name: "Virul", entity: "CS", phoneNo: "714909372" },
    ],
    gender: "Male",
    keyHolder: "Kaushalya",
  },
  {
    roomNo: "214",
    occupants: [
      { name: "Tharindu", entity: "NIBM", phoneNo: "710562603" },
      { name: "Pankaja", entity: "CS", phoneNo: "714225445" },
      { name: "Apurwa", entity: "Kandy", phoneNo: "768450570" },
      { name: "Migara", entity: "USJ", phoneNo: "710131784" },
    ],
    gender: "Male",
    keyHolder: "Tharindu"
  },
  {
    roomNo: "215",
    occupants: [
      { name: "Iminduu", entity: "CS", phoneNo: "760595305" },
      { name: "Sachin", entity: "NSBM", phoneNo: "764365629" },
      { name: "Rashmika", entity: "Rajarata", phoneNo: "723310111" }
    ],
    gender: "Male",
    keyHolder: "Iminduu"
  },
  {
    roomNo: "216",
    occupants: [
      { name: "Fahad", entity: "SLIIT", phoneNo: "722442941" },
      { name: "Nadun", entity: "Rajarata", phoneNo: "784662876" },
      { name: "Dilaxshan", entity: "Ruhuna", phoneNo: "778623014" },
      { name: "Ransika", entity: "CN", phoneNo: "777461740" },
    ],
    gender: "Male",
    keyHolder: "Fahad"
  },
  {
    roomNo: "217",
    occupants: [
      { name: "Bhanuka", entity: "CN", phoneNo: "703820350" },
      { name: "Thisara", entity: "Wayamba", phoneNo: "758379245" },
      { name: "Isula", entity: "USJ", phoneNo: "774710311" },
      { name: "Ismail", entity: "Ruhuna", phoneNo: "760039776" }
    ],
    gender: "Male",
    keyHolder: "Bhanuka"
  },
  {
    roomNo: "144",
    occupants: [
      { name: "Saumya", entity: "USJ", phoneNo: "717940475" },
      { name: "Nadali", entity: "SLIIT", phoneNo: "716946480" },
      { name: "Ashmitha", entity: "Kandy", phoneNo: "743412936" },
      { name: "Methara", entity: "Ruhuna", phoneNo: "772714073" }
    ],
    gender: "Female",
    keyHolder: "Saumya"
  },
  {
    roomNo: "145",
    occupants: [
      { name: "Senaya D", entity: "Ruhuna", phoneNo: "752157707" },
      { name: "Binadi", entity: "SLIIT", phoneNo: "761067086" },
      { name: "Kavithanjaly", entity: "Kandy", phoneNo: "773262848" },
      { name: "Januki", entity: "CC", phoneNo: "704524515" }
    ],
    gender: "Female",
    keyHolder: "Senaya D"
  },
  {
    roomNo: "146",
    occupants: [
      { name: "Fathima", entity: "Kandy", phoneNo: "729211093" },
      { name: "Lochana", entity: "NSBM", phoneNo: "775227140" },
      { name: "Thisangi", entity: "Ruhuna", phoneNo: "712222711" }
    ],
    gender: "Female",
    keyHolder: "Fathima"
  },
  {
    roomNo: "147",
    occupants: [
      { name: "Zahra", entity: "Kandy", phoneNo: "741123891" },
      { name: "Senaya", entity: "SLIIT", phoneNo: "740157194" },
      { name: "Nethara", entity: "Ruhuna", phoneNo: "717434230" },
      { name: "Gimhani", entity: "USJ", phoneNo: "703400336" }
    ],
    gender: "Female",
    keyHolder: "Zahra"
  },
  {
    roomNo: "148",
    occupants: [
      { name: "Pavani", entity: "CN", phoneNo: "771627915" },
      { name: "Kanishka", entity: "NIBM", phoneNo: "750549099" },
      { name: "Vinadi", entity: "Ruhuna", phoneNo: "705271427" },
      { name: "Vinuthi", entity: "CN", phoneNo: "724224514" }
    ],
    gender: "Female",
    keyHolder: "Pavani"
  },
  {
    roomNo: "149",
    occupants: [
      { name: "Pethara", entity: "SLIIT", phoneNo: "741993650" },
      { name: "Sithmini", entity: "CC", phoneNo: "703896375" },
      { name: "Warshi", entity: "Wayamba", phoneNo: "702040670" },
      { name: "Pumudi", entity: "USJ", phoneNo: "742328666" }
    ],
    gender: "Female",
    keyHolder: "Pethara"
  },
  {
    roomNo: "150",
    occupants: [
      { name: "Shahnaas", entity: "Kandy", phoneNo: "740993634" },
      { name: "Damdini", entity: "CC", phoneNo: "717387876" },
      { name: "Gagani", entity: "Ruhuna", phoneNo: "765924659" },
      { name: "Nawoda", entity: "SLIIT", phoneNo: "711336527" }
    ],
    gender: "Female",
    keyHolder: "Shahnaas"
  },
  {
    roomNo: "151",
    occupants: [
      { name: "Dinidi", entity: "SLIIT", phoneNo: "766388408" },
      { name: "Prabavi", entity: "CC", phoneNo: "705501122" },
      { name: "Shashikala", entity: "Rajarata", phoneNo: "786703234" }
    ],
    gender: "Female",
    keyHolder: "Dinidi"
  },
  {
    roomNo: "152",
    occupants: [
      { name: "Jemima", entity: "USJ", phoneNo: "772198975" },
      { name: "Kavishka", entity: "Kandy", phoneNo: "762206380" },
      { name: "Jinathi", entity: "CN", phoneNo: "766390869" },
      { name: "Navoda", entity: "Ruhuna", phoneNo: "775319722" }
    ],
    gender: "Female",
    keyHolder: "Jemima"
  },
  {
    roomNo: "153",
    occupants: [
      { name: "Dinadi", entity: "SLIIT", phoneNo: "760006189" },
      { name: "Dilmi", entity: "CC", phoneNo: "776984164" },
      { name: "Navoda", entity: "Wayamba", phoneNo: "717788187" }
    ],
    gender: "Female",
    keyHolder: "Dinadi"
  },
  {
    roomNo: "107",
    occupants: [
      { name: "Poojanee Jayasinghe", entity: "Colombo South", phoneNo: "706022582" },
      { name: "Kenuli Perera", entity: "Colombo Central", phoneNo: "759156505" },
      { name: "Gloria Fernando", entity: "Colombo North", phoneNo: "704558389" },
      { name: "Sanjana Wijerathna", entity: "Kandy", phoneNo: "705812401" }
    ],
    gender: "Female",
    keyHolder: "Poojanee Jayasinghe"
  },
  {
    roomNo: "108",
    occupants: [
      { name: "Shehara De Silva", entity: "USJ", phoneNo: "763551209" },
      { name: "Kavisha Perera", entity: "Colombo North", phoneNo: "712458903" },
      { name: "Subanki Fernando", entity: "NIBM", phoneNo: "776342119" },
      { name: "Nuwanthi Bandara", entity: "Wayamba", phoneNo: "771995603" }
    ],
    gender: "Female",
    keyHolder: "Shehara De Silva"
  },
  {
    roomNo: "109",
    occupants: [
      { name: "Binni Senanayake", entity: "Kandy", phoneNo: "768091121" },
      { name: "Harithanjali Perera", entity: "Rajarata", phoneNo: "754228761" },
      { name: "Sithumi Jayawardena", entity: "NIBM", phoneNo: "768114552" }
    ],
    "gender": "Female",
    "keyHolder": "Binni Senanayake"
  },
  {
    roomNo: "118",
    occupants: [
      { name: "Ryan Fonseka", entity: "NIBM", phoneNo: "719826400" },
      { name: "Riveen Hewagamage", entity: "Colombo Central", phoneNo: "778999487" },
      { name: "Thanushan Muhunthan", entity: "Ruhuna", phoneNo: "741097292" }
    ],
    gender: "Male",
    keyHolder: "Ryan Fonseka"
  },
  {
    roomNo: "119",
    occupants: [
      { name: "Bawantha Ambawattage", entity: "SLIIT", phoneNo: "763368848" },
      { name: "Yousuf Amri", entity: "NIBM", phoneNo: "781747575" },
      { name: "Kavindu Jayalath", entity: "Colombo South", phoneNo: "714559262" },
      { name: "Ryan (Kandy)", entity: "Kandy", phoneNo: "715712336" }
    ],
    gender: "Male",
    keyHolder: "Bawantha Ambawattage"
  },
  {
    roomNo: "120",
    occupants: [
      { name: "Themiya Walawwatte", entity: "Ruhuna", phoneNo: "717922856" },
      { name: "Nethuja Peramuna", entity: "NSBM", phoneNo: "767095807" },
      { name: "Sandiv Dissanayake", entity: "Colombo South", phoneNo: "717230291" },
      { name: "Vishal Hadharshan", entity: "NIBM", phoneNo: "762250660" }
    ],
    gender: "Male",
    keyHolder: "Themiya Walawwatte"
  },
  {
    roomNo: "121",
    occupants: [
      { name: "Mufeed Mohammad", entity: "Ruhuna", phoneNo: "761952562" },
      { name: "Thejake Dissanayake", entity: "Colombo South", phoneNo: "703534431" },
      { name: "Chamod Jeewantha", entity: "NIBM", phoneNo: "777458392" },
      { name: "Buddhila Pieris", entity: "SLIIT", phoneNo: "766722289" }
    ],
    gender: "Male",
    keyHolder: "Mufeed Mohammad"
  },
  {
    roomNo: "122",
    occupants: [
      { name: "Chamidu Wickramasinghe", entity: "Colombo North", phoneNo: "740588162" },
      { name: "Mahdy Hassan", entity: "SLIIT", phoneNo: "715941151" },
      { name: "Thivanga (CS)", entity: "Colombo South", phoneNo: "UNKNOWN" },
      { name: "Damsith Munasinghe", entity: "NIBM", phoneNo: "716946915" }
    ],
    gender: "Male",
    keyHolder: "Chamidu Wickramasinghe"
  },
  {
    roomNo: "123",
    occupants: [
      { name: "Darshana Galagedara", entity: "USJ", phoneNo: "718822103" },
      { name: "Thuvakaran Franklin", entity: "Colombo North", phoneNo: "724170019" },
      { name: "Keshan Basura", entity: "Ruhuna", phoneNo: "760348969" },
      { name: "Saraff Samli", entity: "Wayamba", phoneNo: "754751590" }
    ],
    gender: "Male",
    keyHolder: "Darshana Galagedara"
  },
  {
    roomNo: "124",
    occupants: [
      { name: "Thumal Kariyapperuma", entity: "Wayamba", phoneNo: "788451504" },
      { name: "Linal Gamalath", entity: "Ruhuna", phoneNo: "704537041" },
      { name: "Mevinu Liyanage", entity: "Colombo South", phoneNo: "743686140" }
    ],
    gender: "Male",
    keyHolder: "Thumal Kariyapperuma"
  },
  {
    roomNo: "125",
    occupants: [
      { name: "Deveen Chandira", entity: "Colombo South", phoneNo: "772124515" },
      { name: "Jeyaruckshan Jeiyaseelan", entity: "Kandy", phoneNo: "750801059" },
      { name: "Punethra Thejan", entity: "Wayamba", phoneNo: "772600386" }
    ],
    gender: "Male",
    keyHolder: "Deveen Chandira"
  },
  {
    roomNo: "126",
    occupants: [
      { name: "Ishan Balasooriya", entity: "Colombo South", phoneNo: "702262003" },
      { name: "Navida Bannehaka", entity: "NIBM", phoneNo: "766833171" },
      { name: "Dinura Munasinghe", entity: "Colombo North", phoneNo: "767679061" }
    ],
    gender: "Male",
    keyHolder: "Ishan Balasooriya"
  },
  {
    roomNo: "127",
    occupants: [
      { name: "Kavindu Prabhash", entity: "Wayamba", phoneNo: "750268992" },
      { name: "Lijuds Segar", entity: "Colombo Central", phoneNo: "751171275" },
      { name: "Vismitha Gunasekara", entity: "NSBM", phoneNo: "788298929" }
    ],
    gender: "Male",
    keyHolder: "Kavindu Prabhash"
  },
  {
    roomNo: "110",
    occupants: [
      { name: "Samindi Keel", entity: "Colombo North", phoneNo: "763034975" },
      { name: "Kavindya Bandara", entity: "Wayamba", phoneNo: "765493421" },
      { name: "Sayumi Ekanayake", entity: "NSBM", phoneNo: "719369539" },
      { name: "Nipuni Dilhara Kaleli Pathirannehelage", entity: "Colombo North", phoneNo: "11465845" }
    ],
    gender: "Female",
    keyHolder: "Samindi Keel"
  },
  {
    roomNo: "111",
    occupants: [
      { name: "Bumini Uyanahewa", entity: "Colombo Central", phoneNo: "765787899" },
      { name: "Dasuni Dasuni", entity: "Wayamba", phoneNo: "783900673" },
      { name: "Dilansa Ayusena", entity: "NSBM", phoneNo: "715168194" }
    ],
    gender: "Female",
    keyHolder: "Bumini Uyanahewa"
  },
  {
    roomNo: "112",
    occupants: [
      { name: "Christle Salgado", entity: "Colombo North", phoneNo: "742544311" },
      { name: "Minadi Athukorala", entity: "SLIIT", phoneNo: "761466639" },
      { name: "Ashrath Rumie", entity: "USJ", phoneNo: "762191023" }
    ],
    gender: "Female",
    keyHolder: "Christle Salgado"
  },
  {
    roomNo: "231",
    occupants: [
      { name: "Ravinesh Perera", entity: "Colombo South", phoneNo: "774338021" },
      { name: "Sasanka Sankalpa", entity: "Ruhuna", phoneNo: "762225274" },
      { name: "Kavinda Wijegunawardana", entity: "NIBM", phoneNo: "765785299" }
    ],
    gender: "Male",
    keyHolder: "Ravinesh Perera"
  },
  {
    roomNo: "232",
    occupants: [
      { name: "Senura Ranathunga", entity: "NIBM", phoneNo: "781110881" },
      { name: "Ayeshmantha Ayesh", entity: "Ruhuna", phoneNo: "712079270" },
      { name: "Desandu Wanniarachchi", entity: "Colombo South", phoneNo: "740950191" }
    ],
    gender: "Male",
    keyHolder: "Senura Ranathunga"
  },
  {
    roomNo: "233",
    occupants: [
      { name: "Shaahid Mohamed", entity: "NSBM", phoneNo: "707260460" },
      { name: "Thedapun Wanninaika", entity: "NSBM", phoneNo: "701727409" },
      { name: "Yehan Namarathna", entity: "NSBM", phoneNo: "716135868" }
    ],
    gender: "Male",
    keyHolder: "Shaahid Mohamed"
  },

  {
    roomNo: "128",
    occupants: [
      { name: "Mihan Ekanayake", entity: "NIBM", phoneNo: "716865034" },
      { name: "Zahid Musthafa", entity: "SLIIT", phoneNo: "776911419" },
      { name: "Danuja Withanage", entity: "Ruhuna", phoneNo: "712581348" },
      { name: "Dihan Masinghe", entity: "Colombo North", phoneNo: "719348166" }
    ],
    gender: "Male",
    keyHolder: "Mihan Ekanayake"
  },
  {
    roomNo: "129",
    occupants: [
      { name: "Rageeshan Chandrasegaran", entity: "SLIIT", phoneNo: "762003626" },
      { name: "Sithum Sithara", entity: "Rajarata", phoneNo: "701233601" },
      { name: "Dineth Wijesuriya", entity: "Ruhuna", phoneNo: "702669006" }
    ],
    gender: "Male",
    keyHolder: "Rageeshan Chandrasegaran"
  },
  {
    roomNo: "130",
    occupants: [
      { name: "Thidas Dharmakeerthi", entity: "Ruhuna", phoneNo: "712780166" },
      { name: "Yuneth Perera", entity: "NSBM", phoneNo: "714531065" },
      { name: "Kavindu Prabhash", entity: "Wayamba", phoneNo: "750268992" },
      { "name": "Ethan (USJ)", "entity": "USJ", "phoneNo": "UNKNOWN" }
    ],
    gender: "Male",
    keyHolder: "Thidas Dharmakeerthi"
  },
  {
    roomNo: "131",
    occupants: [
      { name: "Afeef Fawas", entity: "NSBM", phoneNo: "777990424" },
      { name: "Viraj Sapun", entity: "Ruhuna", phoneNo: "775955130" },
      { name: "Avishka Fonseka", entity: "Colombo North", phoneNo: "752961573" }
    ],
    gender: "Male",
    keyHolder: "Afeef Fawas"
  },

  {
    roomNo: "132",
    occupants: [
      { name: "Dishan Bandara", entity: "Colombo South", phoneNo: "760868809" },
      { name: "Thiviru Aluthpatabandige", entity: "NIBM", phoneNo: "711988085" },
      { name: "Minuka Jayalath", entity: "Colombo Central", phoneNo: "712990925" }
    ],
    gender: "Male",
    keyHolder: "Dishan Bandara"
  },
  {
    roomNo: "133",
    occupants: [
      { name: "Adeeb Naleem Khan", entity: "NSBM", phoneNo: "773907594" },
      { name: "Adithya Wijewickrama", entity: "Ruhuna", phoneNo: "769295656" },
      { name: "Visvattulasi Kalaichelvan", entity: "Colombo South", phoneNo: "740754445" }
    ],
    gender: "Male",
    keyHolder: "Adeeb Naleem Khan"
  },
  {
    roomNo: "334",
    occupants: [
      { name: "Lahiru Silva", entity: "Kandy", phoneNo: "767208047" },
      { name: "Nikila Silva", entity: "Kandy", phoneNo: "740776378" },
      { name: "Thushanth Sivashanthan", entity: "Kandy", phoneNo: "774679496" }
    ],
    gender: "Male",
    keyHolder: "Lahiru Silva"
  },

  {
    roomNo: "335",
    occupants: [
      { name: "Harindu Sadeepa", entity: "Kandy", phoneNo: "705840070" },
      { name: "Avidu Gunawardhana", entity: "Kandy", phoneNo: "701383435" },
      { name: "Midhunesh Thiyagarajah", entity: "Kandy", phoneNo: "766744923" },
      { name: "Roneth Buwanaja", entity: "Kandy", phoneNo: "703421106" }
    ],
    gender: "Male",
    keyHolder: "Harindu Sadeepa"
  },
  {
    roomNo: "236",
    occupants: [
      { name: "Dusheepan Pirabaharan", entity: "Ruhuna", phoneNo: "761141438" },
      { name: "Oshan Wickramarathna", entity: "Ruhuna", phoneNo: "750747851" },
      { name: "Movindu Hansana", entity: "Ruhuna", phoneNo: "717658655" }
    ],
    gender: "Male",
    keyHolder: "Dusheepan Pirabaharan"
  },

  {
    roomNo: "237",
    occupants: [
      { name: "Lakshitha Wijethunga", entity: "Ruhuna", phoneNo: "767594953" },
      { name: "Senuja Bodhinayake", entity: "Ruhuna", phoneNo: "766970855" },
      { name: "Sakila Thejana", entity: "Ruhuna", phoneNo: "702061844" }
    ],
    gender: "Male",
    keyHolder: "Lakshitha Wijethunga"
  },

  {
    roomNo: "172",
    occupants: [
      { name: "Yenul Perera", entity: "SLIIT", phoneNo: "774791096" },
      { name: "Yeshan K.P", entity: "SLIIT", phoneNo: "766035565" },
      { name: "Harshitha Herath", entity: "SLIIT", phoneNo: "770371157" }
    ],
    gender: "Male",
    keyHolder: "Yenul Perera"
  },
  {
    roomNo: "173",
    occupants: [
      { name: "Chelaka Wijesekara", entity: "SLIIT", phoneNo: "769430928" },
      { name: "Sabeelur Rashaad", entity: "SLIIT", phoneNo: "774226876" },
      { name: "Savinda Sithum", entity: "SLIIT", phoneNo: "765460938" }
    ],
    gender: "Male",
    keyHolder: "Chelaka Wijesekara"
  },
  {
    roomNo: "134",
    occupants: [
      { name: "Godfri Godfri", entity: "Colombo Central", phoneNo: "787093942" },
      { name: "Jude Hewagamage", entity: "Colombo Central", phoneNo: "703519023" },
      { name: "Gaveesha Wickrama", entity: "Colombo Central", phoneNo: "712081704" }
    ],
    gender: "Male",
    keyHolder: "Godfri Godfri"
  },
  {
    roomNo: "135",
    occupants: [
      { name: "Lakindu Vithanaarachchi", entity: "Colombo Central", phoneNo: "707425525" },
      { name: "Imdhadh Iqbal", entity: "Colombo Central", phoneNo: "777675673" },
      { name: "Sachin Elvitigala", entity: "Colombo Central", phoneNo: "764320777" }
    ],
    gender: "Male",
    keyHolder: "Lakindu Vithanaarachchi"
  },
  {
    roomNo: "136",
    occupants: [
      { name: "Dileepa Bandara", entity: "USJ", phoneNo: "761273695" },
      { name: "Dinuka Wimalagunasekara", entity: "USJ", phoneNo: "740901606" },
      { name: "Akshay Vijayakumar", entity: "USJ", phoneNo: "760433353" }
    ],
    gender: "Male",
    keyHolder: "Dileepa Bandara"
  },
  {
    roomNo: "137",
    occupants: [
      { name: "Mahima Yasas", entity: "USJ", phoneNo: "766355536" },
      { name: "Nayana Fernando", entity: "USJ", phoneNo: "704881210" },
      { name: "Himeth Wimalagunaratne", entity: "USJ", phoneNo: "719432273" }
    ],
    gender: "Male",
    keyHolder: "Mahima Yasas"
  },
  {
    roomNo: "218",
    occupants: [
      { name: "Inuri Liyanage", entity: "Kandy", phoneNo: "94712417751" },
      { name: "Thavishi Gunarathna", entity: "Colombo Central", phoneNo: "711338196" },
      { name: "Thulara Pathirana", entity: "Rajarata", phoneNo: "740949081" }
    ],
    gender: "Female",
    keyHolder: "Inuri Liyanage"
  },
  {
    roomNo: "154",
    occupants: [
      { name: "Chamindi Kaveesha", entity: "SLIIT", phoneNo: "777257027" },
      { name: "Yeshmin Raja Neththige", entity: "Colombo Central", phoneNo: "778864389" },
      { name: "Dulcini Wickramasingha", entity: "Colombo North", phoneNo: "741258835" }
    ],
    gender: "Female",
    keyHolder: "Chamindi Kaveesha"
  },
  {
    roomNo: "219",
    occupants: [
      { name: "Sanadi Uduwana", entity: "Colombo North", phoneNo: "723645888" },
      { name: "Ishara Perera", entity: "Rajarata", phoneNo: "760479546" },
      { name: "Amaya Kehara", entity: "Ruhuna", phoneNo: "703950648" },
      { name: "Chanuli Pathirana", entity: "SLIIT", phoneNo: "716240676" }
    ],
    gender: "Female",
    keyHolder: "Chanuli Pathirana"
  },
  {
    roomNo: "155",
    occupants: [
      { name: "Devmi Weerasuriya", entity: "USJ", phoneNo: "740994528" },
      { name: "Imarah Al-Mashoor", entity: "Kandy", phoneNo: "728078889" },
      { name: "Thathsarani Wijesinghe", entity: "Rajarata", phoneNo: "711840151" }
    ],
    gender: "Female",
    keyHolder: "Devmi Weerasuriya"
  },
  {
    roomNo: "220",
    occupants: [
      { name: "Sanadi Munasinghe", entity: "USJ", phoneNo: "729312121" },
      { name: "Tashini De Silva", entity: "Colombo Central", phoneNo: "762311129" },
      { name: "Thisangi Perera", entity: "Ruhuna", phoneNo: "712222711" }
    ],
    gender: "Female",
    keyHolder: "Sanadi Munasinghe"
  },
  {
    roomNo: "156",
    occupants: [
      { name: "Methpani Rathnayake", entity: "Ruhuna", phoneNo: "702420113" },
      { name: "Ekagri Panawalage", entity: "Kandy", phoneNo: "767901797" },
      { name: "Lakshika Jeyachandran", entity: "Rajarata", phoneNo: "778048666" }
    ],
    gender: "Female",
    keyHolder: "Methpani Rathnayake"
  },
  {
    roomNo: "321",
    occupants: [
      { name: "Sathini Weerasinghe", entity: "Colombo North", phoneNo: "768907855" },
      { name: "Disari Thanthiriwattage", entity: "Ruhuna", phoneNo: "722752554" },
      { name: "Binithi Ranaweera", entity: "Colombo North", phoneNo: "758774090" }
    ],
    gender: "Female",
    keyHolder: "Sathini Weerasinghe"
  },
  {
    roomNo: "221",
    occupants: [
      { name: "Manisha Selvanayagam", entity: "Colombo Central", phoneNo: "742933039" },
      { name: "Hafsa Hafsa", entity: "Kandy", phoneNo: "740562525" },
      { name: "Amani Jayasekara", entity: "Rajarata", phoneNo: "754074725" }
    ],
    gender: "Female",
    keyHolder: "Manisha Selvanayagam"
  },
  {
    roomNo: "157",
    occupants: [
      { name: "Shahla Irshan", entity: "Kandy", phoneNo: "762203563" },
      { name: "Maheli Ruhunuge", entity: "Colombo Central", phoneNo: "771517415" },
      { name: "Michelle Warnakulasooriya", entity: "SLIIT", phoneNo: "762373943" }
    ],
    gender: "Female",
    keyHolder: "Shahla Irshan"
  },
  {
    roomNo: "322",
    occupants: [
      { name: "Dinuki Masakorala", entity: "USJ", phoneNo: "771410592" },
      { name: "Thanujana Wickramasinghe", entity: "NSBM", phoneNo: "756753826" },
      { name: "Hirushi Opatha", entity: "Colombo North", phoneNo: "716546033" }
    ],
    gender: "Female",
    keyHolder: "Dinuki Masakorala"
  },
  {
    roomNo: "222",
    occupants: [
      { name: "Chathumini Chathumini", entity: "Colombo Central", phoneNo: "768342233" },
      { name: "Savindi Ilukpitiya", entity: "NIBM", phoneNo: "721491665" },
      { name: "Omali Nimesha Weerasinghe", entity: "SLIIT", phoneNo: "710568010" }
    ],
    gender: "Female",
    keyHolder: "Chathumini Chathumini"
  },
  {
    roomNo: "158",
    occupants: [
      { name: "Jayani Upeksha", entity: "Kandy", phoneNo: "778589272" },
      { name: "Sarah Sarah", entity: "NIBM", phoneNo: "778446903" },
      { name: "Sasandi Abeywickrama", entity: "Colombo North", phoneNo: "767519740" }
    ],
    gender: "Female",
    keyHolder: "Jayani Upeksha"
  },
  {
    roomNo: "323",
    occupants: [
      { name: "Shenise Pronk", entity: "SLIIT", phoneNo: "764684101" },
      { name: "Imandi Amalna", entity: "Rajarata", phoneNo: "777426076" },
      { name: "Sandu LC RUHUNA", entity: "Ruhuna", phoneNo: "776188934" },
      { name: "Natheesha Vithanawasam", entity: "Colombo North", phoneNo: "751403105" }
    ],
    gender: "Female",
    keyHolder: "Shenise Pronk"
  },
  {
    roomNo: "223",
    occupants: [
      { name: "Pavithri Haththotuwa", entity: "Kandy", phoneNo: "712438918" },
      { name: "Thehara Thehara", entity: "Colombo Central", phoneNo: "779239600" },
      { name: "Varsha Anilkumar", entity: "Ruhuna", phoneNo: "764182609" }
    ],
    gender: "Female",
    keyHolder: "Pavithri Haththotuwa"
  },
  {
    roomNo: "159",
    occupants: [
      { name: "Shinthurie Markandakuganathan", entity: "Colombo South", phoneNo: "760028575" },
      { name: "Leeza Gilbert", entity: "NSBM", phoneNo: "766007514" },
      { name: "Keshala Jayawickrama", entity: "Wayamba", phoneNo: "706620422" }
    ],
    gender: "Female",
    keyHolder: "Shinthurie Markandakuganathan"
  },
  {
    roomNo: "324",
    occupants: [
      { name: "Senaya Hewapathirana", entity: "Ruhuna", phoneNo: "727500879" },
      { name: "Heyince Emoni Outschoorn", entity: "Kandy", phoneNo: "725608207" },
      { name: "Merushika Alahakoon", entity: "Colombo North", phoneNo: "766304390" }
    ],
    gender: "Female",
    keyHolder: "Senaya Hewapathirana"
  },
  {
    roomNo: "224",
    occupants: [
      { name: "Sineka Dissanayake", entity: "Kandy", phoneNo: "706663003" },
      { name: "Britney Goodwin", entity: "SLIIT", phoneNo: "761028909" }
    ],
    gender: "Female",
    keyHolder: "Sineka Dissanayake"
  },
  {
    roomNo: "160",
    occupants: [
      { name: "Vihangi Ranaweera", entity: "USJ", phoneNo: "705031384" },
      { name: "Sachini Rathnayake", entity: "Kandy", phoneNo: "714677615" },
      { name: "Senuri Jayasinghe", entity: "NSBM", phoneNo: "773320262" }
    ],
    gender: "Female",
    keyHolder: "Vihangi Ranaweera"
  },
  {
    roomNo: "325",
    occupants: [
      { name: "Geethi Piyasinghe", entity: "Colombo Central", phoneNo: "712692620" },
      { name: "Ruchini Edirisinghe", entity: "NSBM", phoneNo: "766364452" },
      { name: "Aathmica Aathmi", entity: "Ruhuna", phoneNo: "763722460" }
    ],
    gender: "Female",
    keyHolder: "Geethi Piyasinghe"
  },
  {
    roomNo: "225",
    occupants: [
      { name: "Ashwini Koneswara", entity: "Colombo Central", phoneNo: "779660305" },
      { name: "Hindujjah Subramaniyam", entity: "Kandy", phoneNo: "760133540" },
      { name: "Nethmi Ramanayake", entity: "Rajarata", phoneNo: "774831916" }
    ],
    gender: "Female",
    keyHolder: "Ashwini Koneswara"
  },
  {
    roomNo: "161",
    occupants: [
      { name: "Pethara Ranasinghe", entity: "SLIIT", phoneNo: "741993650" },
      { name: "Hansali Kariyawasam", entity: "Colombo South", phoneNo: "701518194" },
      { name: "Dilmi Karunarathna", entity: "Colombo North", phoneNo: "776984164" }
    ],
    gender: "Female",
    keyHolder: "Pethara Ranasinghe"
  },
  {
    roomNo: "326",
    occupants: [
      { name: "Divya Dulanjali", entity: "Colombo Central", phoneNo: "776022600" },
      { name: "Monali Edrisinghe", entity: "SLIIT", phoneNo: "742430091" },
      { name: "Shaheeda Ahmed", entity: "USJ", phoneNo: "743935694" },
      { name: "Thisagi Panagoda", entity: "Ruhuna", phoneNo: "762931355" }
    ],
    gender: "Female",
    keyHolder: "Divya Dulanjali"
  },
  {
    roomNo: "226",
    occupants: [
      { name: "Chanuli Pathirana", entity: "Colombo Central", phoneNo: "716240676" },
      { name: "Sathindi Upeksha Yapa", entity: "NSBM", phoneNo: "742303377" },
      { name: "Chamodhi Wijesundara", entity: "USJ", phoneNo: "711806825" }
    ],
    gender: "Female",
    keyHolder: "Chanuli Pathirana"
  },
  {
    roomNo: "162",
    occupants: [
      { name: "Amasha Fernando", entity: "Colombo North", phoneNo: "716168872" },
      { name: "Shakya Ratnatilake", entity: "Colombo Central", phoneNo: "777231720" },
      { name: "Jayanima Omalhari", entity: "Rajarata", phoneNo: "758871377" }
    ],
    gender: "Female",
    keyHolder: "Amasha Fernando"
  },
  {
    roomNo: "327",
    occupants: [
      { name: "Nivedhitha Chandrasekaran", entity: "Colombo Central", phoneNo: "742936786" },
      { name: "Imelsha Fernando Aththachchi", entity: "Wayamba", phoneNo: "763556275" },
      { name: "Imanga Nethmini", entity: "USJ", phoneNo: "716980642" }
    ],
    gender: "Female",
    keyHolder: "Nivedhitha Chandrasekaran"
  },
  {
    roomNo: "227",
    occupants: [
      { name: "Dahamya Ranasinghe", entity: "SLIIT", phoneNo: "703810059" },
      { name: "Kaveesha Piyasinghe", entity: "Rajarata", phoneNo: "712692620" },
      { name: "Manuthi Withana Arachchige", entity: "Colombo North", phoneNo: "722920606" }
    ],
    gender: "Female",
    keyHolder: "Dahamya Ranasinghe"
  },
  {
    roomNo: "163",
    occupants: [
      { name: "Ihara Jayawardhana", entity: "Kandy", phoneNo: "703419605" },
      { name: "Kavini Gunarathna", entity: "Rajarata", phoneNo: "766877551" },
      { name: "Navoda Bandara", entity: "Wayamba", phoneNo: "776293098" }
    ],
    gender: "Female",
    keyHolder: "Ihara Jayawardhana"
  },
  {
    roomNo: "328",
    occupants: [
      { name: "Sara Nasrin", entity: "Ruhuna", phoneNo: "784344417" },
      { name: "Sironika Sironika", entity: "Colombo South", phoneNo: "705150777" },
      { name: "Thrinayani Selvanathan", entity: "USJ", phoneNo: "779680928" }
    ],
    gender: "Female",
    keyHolder: "Sara Nasrin"
  },
  {
    roomNo: "228",
    occupants: [
      { name: "Kojee Kehara", entity: "Ruhuna", phoneNo: "712124346" },
      { name: "Ovindi Methsarani", entity: "NSBM", phoneNo: "775014730" },
      { name: "Dinithi Muthukumarana", entity: "USJ", phoneNo: "704982264" },
      { name: "Panchali Perera", entity: "Wayamba", phoneNo: "774302056" }
    ],
    gender: "Female",
    keyHolder: "Ovindi Methsarani"
  },
  {
    roomNo: "164",
    occupants: [
      { name: "Sayuni Ruwanima", entity: "Kandy", phoneNo: "718798676" },
      { name: "Miulandi Gunasekara", entity: "NIBM", phoneNo: "784370627" },
      { name: "Piyangie Baduge", entity: "SLIIT", phoneNo: "704059095" }
    ],
    gender: "Female",
    keyHolder: "Sayuni Ruwanima"
  },
  {
    roomNo: "329",
    occupants: [
      { name: "Devmi Kulathunga", entity: "Kandy", phoneNo: "718845864" },
      { name: "Savidya Wijayakulasooriya", entity: "NSBM", phoneNo: "705282925" },
      { name: "Isuri Isuri", entity: "Colombo North", phoneNo: "705384593" }
    ],
    gender: "Female",
    keyHolder: "Devmi Kulathunga"
  },
  {
    roomNo: "229",
    occupants: [
      { name: "Tracey Johnson", entity: "NSBM", phoneNo: "760325677" },
      { name: "Kavishva Nandasena", entity: "Colombo North", phoneNo: "710366446" },
      { name: "Vihangi Ranaweera", entity: "USJ", phoneNo: "705031384" }
    ],
    gender: "Female",
    keyHolder: "Tracey Johnson"
  },
  {
    roomNo: "165",
    occupants: [
      { name: "Puravi Kulathunga", entity: "Colombo Central", phoneNo: "711386658" },
      { name: "Samadhi Kodithuwakku", entity: "Rajarata", phoneNo: "Anjalee" },
      { name: "Chetha Atapattu", entity: "SLIIT", phoneNo: "704366825" }
    ],
    gender: "Female",
    keyHolder: "Puravi Kulathunga"
  },
  {
    roomNo: "330",
    occupants: [
      { name: "Nilma Malkini", entity: "Colombo North", phoneNo: "762130406" },
      { name: "Himasha Samarathunga", entity: "Colombo Central", phoneNo: "716445645" },
      { name: "Heshani Navodya Hathurusinghe Devage", entity: "NIBM", phoneNo: "725292660" }
    ],
    gender: "Female",
    keyHolder: "Nilma Malkini"
  },
  {
    roomNo: "230",
    occupants: [
      { name: "Methya Weeraratne", entity: "NSBM", phoneNo: "760733788" },
      { name: "Anushka Kheembhiya Pathiranage", entity: "Colombo North", phoneNo: "706563663" },
      { name: "Tharini Pathirana", entity: "Wayamba", phoneNo: "711447665" }
    ],
    gender: "Female",
    keyHolder: "Methya Weeraratne"
  },
  {
    roomNo: "166",
    occupants: [
      { name: "Prabhashi Ranaweera", entity: "Colombo Central", phoneNo: "702247917" },
      { name: "Sandali Indigahawela", entity: "Colombo Central", phoneNo: "712044353" },
      { name: "Anjalee Perera", entity: "NSBM", phoneNo: "775732437" },
      { name: "Sanuli Dhanuge", entity: "Colombo North", phoneNo: "751712660" }
    ],
    gender: "Female",
    keyHolder: "Prabhashi Ranaweera"
  },
  {
    roomNo: "331",
    occupants: [
      { name: "Sanuthmi Kanuwanaarachchi", entity: "Colombo South", phoneNo: "785417354" },
      { name: "Pabara Paba", entity: "NSBM", phoneNo: "781330558" },
      { name: "Shaiqa Hifaz", entity: "Colombo North", phoneNo: "773558067" }
    ],
    gender: "Female",
    keyHolder: "Sanuthmi Kanuwanaarachchi"
  },
  {
    roomNo: "167",
    occupants: [
      { name: "Nirmani Weerakoon", entity: "Colombo North", phoneNo: "703416997" },
      { name: "Chamodhi Wijesundara", entity: "Ruhuna", phoneNo: "711806825" },
      { name: "Maleesha Karunarathna", entity: "Rajarata", phoneNo: "776984164" }
    ],
    gender: "Female",
    keyHolder: "Nirmani Weerakoon"
  },
  {
    roomNo: "332",
    occupants: [
      { name: "Savithmi Minsaree", entity: "USJ", phoneNo: "706970740" },
      { name: "Chithmi Madan Arachchige", entity: "Ruhuna", phoneNo: "782498942" },
      { name: "Subodhi Kollurage Dona", entity: "SLIIT", phoneNo: "773269576" }
    ],
    gender: "Female",
    keyHolder: "Savithmi Minsaree"
  },
  {
    roomNo: "168",
    occupants: [
      { name: "Yethmini Perera", entity: "Kandy", phoneNo: "763574311" },
      { name: "Dilma Jayatissa", entity: "Colombo Central", phoneNo: "740862316" },
      { name: "Randi Gunasekara", entity: "SLIIT", phoneNo: "773462490" }
    ],
    gender: "Female",
    keyHolder: "Yethmini Perera"
  },
  {
    roomNo: "333",
    occupants: [
      { name: "Chamodya Bandarawatta", entity: "Wayamba", phoneNo: "766966488" },
      { name: "Subodha Emanuwel", entity: "Wayamba", phoneNo: "763432024" },
      { name: "Sanduni Tharuka", entity: "Wayamba", phoneNo: "715607776" }
    ],
    gender: "Female",
    keyHolder: "Chamodya Bandarawatta"
  },
  {
    roomNo: "169",
    occupants: [
      { name: "Aamina Riffath", entity: "Rajarata", phoneNo: "774144786" },
      { name: "Kavya Tilakasena", entity: "Rajarata", phoneNo: "702800680" },
      { name: "Dinithi Costha", entity: "Rajarata", phoneNo: "769284908" }
    ],
    gender: "Female",
    keyHolder: "Aamina Riffath"
  },
  {
    roomNo: "234",
    occupants: [
      { name: "Minangi Jayasinghe", entity: "Colombo South", phoneNo: "714158559" },
      { name: "Savithmi Minsaree", entity: "Colombo South", phoneNo: "706970740" },
      { name: "Thisuni Kuruwitaarachchige", entity: "Colombo South", phoneNo: "706633546" }
    ],
    gender: "Female",
    keyHolder: "Minangi Jayasinghe"
  },
  {
    roomNo: "170",
    occupants: [
      { name: "Sandavi Jayasekara", entity: "Colombo North", phoneNo: "717434230" },
      { name: "Shimasha Manawadu", entity: "Colombo North", phoneNo: "703926342" },
      { name: "Chamilka Wijesinghe", entity: "Colombo North", phoneNo: "761429338" }
    ],
    gender: "Female",
    keyHolder: "Sandavi Jayasekara"
  },
  {
    roomNo: "235",
    occupants: [
      { name: "Oshadi Liyanage", entity: "Colombo South", phoneNo: "702502890" },
      { name: "Vino Wanniarachchi", entity: "Colombo South", phoneNo: "741137659" },
      { name: "Rancini Wickramasinghe", entity: "Colombo South", phoneNo: "762394100" }
    ],
    gender: "Female",
    keyHolder: "Oshadi Liyanage"
  },
  {
    roomNo: "171",
    occupants: [
      { name: "Minduli Atapattu", entity: "Colombo North", phoneNo: "771994835" },
      { name: "Shahma Silmy", entity: "Colombo North", phoneNo: "769456672" },
      { name: "Sathmi Rajapaksha", entity: "Colombo North", phoneNo: "768321760" }
    ],
    gender: "Female",
    keyHolder: "Minduli Atapattu"
  },
  {
    roomNo: "336",
    occupants: [
      { name: "Nethuli Paranavidana", entity: "NIBM", phoneNo: "712720917" },
      { name: "Kavya NIBM", entity: "NIBM", phoneNo: "702800680" },
      { name: "Vihansa Herath Mudiyanselage", entity: "NIBM", phoneNo: "774526264" }
    ],
    gender: "Female",
    keyHolder: "Nethuli Paranavidana"
  },
  {
    roomNo: "337",
    occupants: [
      { name: "Divya Dulanjali", entity: "NIBM", phoneNo: "776022600" },
      { name: "Hashini Manodya", entity: "NIBM", phoneNo: "741903553" },
      { name: "Venuki Wijeratne", entity: "NIBM", phoneNo: "782998998" }
    ],
    gender: "Female",
    keyHolder: "Divya Dulanjali"
  }
]



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
      className="video-bg-container !px-6 md:!px-12 font-mono"
    >
      <div className="video-bg-overlay"></div>

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

