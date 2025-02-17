import amqplib,{Connection,Channel} from 'amqplib'

let connection:Connection
let channel:Channel

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'rabbitmq'; 
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || '5672'; 
export const rabbitmqConnect = async () => {
    try {
        connection = await amqplib.connect(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ in project-service');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ');
        console.error('Error details:', error);
    }
};



export const getChannel = (): Channel => channel;