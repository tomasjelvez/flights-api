const config = {
  database: "flights_db",
  user: "root",
  password: "example",
};

db = db.getSiblingDB("admin");
db.auth(config.user, config.password);
db = db.getSiblingDB(config.database);

db.createUser({
  user: config.user,
  pwd: config.password,
  roles: [{ role: "readWrite", db: config.database }],
});

const sampleFlights = [
  {
    flightCode: "TEST001",
    passengers: [
      {
        id: 139577,
        name: "Martín Alvarez",
        hasConnections: false,
        age: 2,
        flightCategory: "Gold",
        reservationId: "8ZC5KYVK",
        hasCheckedBaggage: false,
      },
      {
        id: 530874,
        name: "Jorge Hernández",
        hasConnections: false,
        age: 16,
        flightCategory: "Black",
        reservationId: "O2DQ3SZS",
        hasCheckedBaggage: false,
      },
      {
        id: 426098,
        name: "Pedro Ruiz",
        hasConnections: false,
        age: 33,
        flightCategory: "Black",
        reservationId: "KSXXOALO",
        hasCheckedBaggage: true,
      },
      {
        id: 757837,
        name: "Paola Vargas",
        hasConnections: true,
        age: 48,
        flightCategory: "Platinum",
        reservationId: "8ZC5KYVK",
        hasCheckedBaggage: false,
      },
      {
        id: 366477,
        name: "Juan Ortega",
        hasConnections: true,
        age: 75,
        flightCategory: "Platinum",
        reservationId: "RPT8LU2M",
        hasCheckedBaggage: true,
      },
      {
        id: 825792,
        name: "Jorge Vargas",
        hasConnections: true,
        age: 37,
        flightCategory: "Black",
        reservationId: "8ZC5KYVK",
        hasCheckedBaggage: true,
      },
      {
        id: 668601,
        name: "Paola Hernández",
        hasConnections: true,
        age: 30,
        flightCategory: "Black",
        reservationId: "RPT8LU2M",
        hasCheckedBaggage: false,
      },
      {
        id: 245409,
        name: "Carlos González",
        hasConnections: true,
        age: 34,
        flightCategory: "Normal",
        reservationId: "RPT8LU2M",
        hasCheckedBaggage: false,
      },
      {
        id: 610771,
        name: "Ricardo Ruiz",
        hasConnections: true,
        age: 9,
        flightCategory: "Gold",
        reservationId: "KSXXOALO",
        hasCheckedBaggage: true,
      },
      {
        id: 139485,
        name: "Martín Ruiz",
        hasConnections: false,
        age: 41,
        flightCategory: "Gold",
        reservationId: "KSXXOALO",
        hasCheckedBaggage: false,
      },
      {
        id: 552697,
        name: "Ana Fernández",
        hasConnections: true,
        age: 18,
        flightCategory: "Gold",
        reservationId: "426OMP5O",
        hasCheckedBaggage: true,
      },
      {
        id: 620159,
        name: "Valentina Pérez",
        hasConnections: false,
        age: 56,
        flightCategory: "Normal",
        reservationId: "FKY4HRMH",
        hasCheckedBaggage: false,
      },
      {
        id: 120718,
        name: "Paola Díaz",
        hasConnections: true,
        age: 5,
        flightCategory: "Platinum",
        reservationId: "8ZC5KYVK",
        hasCheckedBaggage: true,
      },
      {
        id: 953815,
        name: "Javier Silva",
        hasConnections: false,
        age: 44,
        flightCategory: "Gold",
        reservationId: "2ZOTLIVZ",
        hasCheckedBaggage: false,
      },
      {
        id: 164557,
        name: "Valentina Navarro",
        hasConnections: false,
        age: 43,
        flightCategory: "Black",
        reservationId: "RPT8LU2M",
        hasCheckedBaggage: true,
      },
      {
        id: 566203,
        name: "Luis Ríos",
        hasConnections: true,
        age: 16,
        flightCategory: "Normal",
        reservationId: "S05KSFJ6",
        hasCheckedBaggage: false,
      },
      {
        id: 550014,
        name: "Camila Rodríguez",
        hasConnections: true,
        age: 53,
        flightCategory: "Black",
        reservationId: "8ZC5KYVK",
        hasCheckedBaggage: true,
      },
      {
        id: 371528,
        name: "Valentina Pérez",
        hasConnections: false,
        age: 13,
        flightCategory: "Normal",
        reservationId: "UAN6K7Q8",
        hasCheckedBaggage: true,
      },
      {
        id: 963762,
        name: "Luis Ortega",
        hasConnections: true,
        age: 20,
        flightCategory: "Platinum",
        reservationId: "5PLUY0UN",
        hasCheckedBaggage: true,
      },
      {
        id: 241222,
        name: "Luis Fernández",
        hasConnections: false,
        age: 11,
        flightCategory: "Black",
        reservationId: "KSXXOALO",
        hasCheckedBaggage: false,
      },
    ],
  },
];

try {
  db.flights.drop();

  db.flights.insertMany(sampleFlights);

  const count = db.flights.countDocuments();
  printjson({
    status: "success",
    message: `${count} vuelos insertados correctamente`,
    flights: db.flights.find().toArray(),
  });
} catch (error) {
  printjson({
    status: "error",
    message: "Error al insertar los datos",
    error: error.message,
  });
}
