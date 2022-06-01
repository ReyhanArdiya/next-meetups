import { MongoClient } from "mongodb";

const { MONGO_URI } = process.env;

export default async (req, res) => {
	try {
		const client = await MongoClient.connect(MONGO_URI);
		const db = client.db();
		const Meetup = db.collection("meetups");

		switch (req.method) {
			case "POST":
				const meetup = await Meetup.insertOne(req.body);
				res.status(201).json(meetup);
			case "GET":
			default:
				res.status(200).json(await Meetup.find().toArray());
		}
	} catch (err) {
		console.log(req.body);
		throw err;
	}

	await client.close();
};
