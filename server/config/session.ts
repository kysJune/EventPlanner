import session from "express-session";
import { Express } from "express";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

const mongoSession = (app: Express) => {
	app.use(
		session({
			name: "sessionid",
			secret: "secretfkadshkfhasdjfhakfsad",
			store: MongoStore.create({
				mongoUrl: process.env.MONGO_DB_URL
			}),
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 1000 * 60 * 60 * 2
			}
		})
	);
};

export default mongoSession;
