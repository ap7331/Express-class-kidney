const express = require("express");
const app = express();

const user = [
  {
    name: "John Doe",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

app.get("/", function (req, res) {
  const johnKidneys = user[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

//add isHealthy true or false depends on value give
app.post("/", function (req, res) {
  // console.log(req.body); //undefined
  const isHealthy = req.body.isHealthy;
  user[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

// change unhealthy kidney to healthy
app.put("/", function (req, res) {
  for (let i = 0; i < user[0].kidneys.length; i++) {
    user[0].kidneys[i].healthy = true;
  }
  res.json({});
});

//removing all the unhealthy kidney
app.delete("/", function (req, res) {
  // only if atleast one unhealthy kidney is there then remove unhealthy kidney, or else return 411;
  const newKidneys = [];
  if (isThereAtleastOneUnhealthyKidney()) {
    for (let i = 0; i < user[0].kidneys.length; i++) {
      if (user[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    user[0].kidneys = newKidneys;
    res.json({ msg: "done" });
  } else {
    res.status(411).json({
      msg: "You have no bad Kidneys",
    });
  }
});

function isThereAtleastOneUnhealthyKidney() {
  let atleastOneUnhealthyKidney = false; // inilize that there are no unhealthy kidney
  for (let i = 0; i < user[0].kidneys.length; i++) {
    if (!user[0].kidneys[i].healthy) {
      atleastOneUnhealthyKidney = true;
    }
  }
  return atleastOneUnhealthyKidney;
}

app.listen(3000);
