import session from "express-session";
import MongoStore from "connect-mongo";

require("dotenv").config();

const mongoSession = (app: any) => {
	app.use(
		session({
			name: "sessionid",
			secret: "secret",
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
