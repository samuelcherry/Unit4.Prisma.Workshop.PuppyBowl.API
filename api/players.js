const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      const error = {
        status: 400,
        message: "players must have a name."
      };

      return next(error);
    }

    const players = await prisma.player.create({ data: { name } });
    res.status(201).json(players);
  } catch {
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const players = await prisma.player.findUnique({ where: { id } });

    if (!players) {
      return next({
        status: 404,
        message: `Could not find players with id ${id}.`
      });
    }

    res.json(players);
  } catch {
    next();
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const playersExists = await prisma.player.findUnique({ where: { id } });
    if (!playersExists) {
      return next({
        status: 404,
        message: `Could not find players with id ${id}.`
      });
    }

    const { name } = req.body;
    if (!name) {
      return next({
        status: 400,
        message: "players must have a name."
      });
    }

    const players = await prisma.player.update({
      where: { id },
      data: { name }
    });

    res.json(players);
  } catch {
    next();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const playersExists = await prisma.player.findUnique({ where: { id } });
    if (!playersExists) {
      return next({
        status: 404,
        message: `Could not find players with id ${id}.`
      });
    }

    await prisma.players.delete({ where: { id } });

    res.sendStatus(204);
  } catch {
    next();
  }
});
