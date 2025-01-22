import amqplib,{Connection,Channel} from 'amqplib'

let connection:Connection
let channel:Channel


export const rabbitmqConnect = async () => {
    try {
        connection = await amqplib.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ in project-service');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ');
        console.error('Error details:', error);
    }
};



export const getChannel = (): Channel => channel;