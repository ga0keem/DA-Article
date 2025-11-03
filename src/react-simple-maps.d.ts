declare module 'react-simple-maps';

declare module "*.json" {
    const value: {
        type: string;
        features: any[];
        [key: string]: any;
    };
    export default value;
}