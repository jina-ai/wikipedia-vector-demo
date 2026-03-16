import 'reflect-metadata';
import { UDCEmbedder } from '../auto-udc';

import { container } from 'tsyringe';

const instance = container.resolve(UDCEmbedder);

process.on('unhandledRejection', (reason) => {
    instance.logger.error('Unhandled Rejection at:', { reason });
});

instance.serviceReady().then((r)=> r.indexAllCategories()).catch(err => {
    console.error('Error in main:', err);
    process.exit(1);
}).finally(() => process.exit());