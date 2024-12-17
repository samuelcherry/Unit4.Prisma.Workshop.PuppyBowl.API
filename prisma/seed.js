const prisma = require("../prisma");
const seed = async () => {
  const createPlayers = async () => {
    const players = [
      { name: "Dipper", breed: "Springer", status: "FIELD" },
      { name: "Scooby", breed: "Great Dane", status: "BENCH" },
      { name: "Scrabby", breed: "Great Dane", status: "FIELD" },
      { name: "Lassie", breed: "Collie", status: "BENCH" },
      { name: "Old Yeller", breed: "Black Mouth Cur", status: "FIELD" },
      { name: "Balto", breed: "Husky", status: "BENCH" },
      { name: "Rin Tin Tin", breed: "German Shepherd", status: "FIELD" },
      { name: "Airbud", breed: "Golden Retriever", status: "BENCH" },
      { name: "Beethover", breed: "St Bernard", status: "FIELD" },
      { name: "Laika", breed: "Mutt", status: "BENCH" }
    ];
    await prisma.player.createMany({ data: players });
  };
  await createPlayers();
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
