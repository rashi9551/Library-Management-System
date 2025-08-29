import { Application } from "express";
import connectDB from "./config/mongo";
import express from "express";
import userRoute from "./app/routes/userRoute";
import bookRoute from "./app/routes/bookRoute";
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { limiter } from './utils/rateLimitter';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';

class App {
    public app: Application;
    public server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    private swaggerDocument: object | undefined;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);

        this.applyMiddleware();
        this.loadSwagger();
        this.routes();
        connectDB();
    }

    private applyMiddleware(): void {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(logger("dev"));
        this.app.use(cookieParser());
        this.app.use(limiter);
    }

    private loadSwagger(): void {
        const swaggerFile = path.join(__dirname, 'swagger', 'swagger.yml'); // use .yml
    this.swaggerDocument = yaml.load(fs.readFileSync(swaggerFile, 'utf8')) as object;
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
    }

    private routes(): void {
        this.app.use('/api/auth', userRoute);
        this.app.use('/api/books', bookRoute);

        // Error-handling middleware
        this.app.use((req, res, next) => {
            res.status(500).send('Something broke!');
        });
    }

    public startServer(PORT: number): void {
        this.server.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }
}

export default App;
