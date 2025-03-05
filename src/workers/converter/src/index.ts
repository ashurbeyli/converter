import { conversionConsumer } from './consumers/conversionConsumer';

conversionConsumer().catch((err: any) => {
    console.error('Error starting worker:', err);
});