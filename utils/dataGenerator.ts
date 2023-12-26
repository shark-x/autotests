import { faker }  from '@faker-js/faker';

export class DataGenerator {

    static getRandomTask() {
        return {
            name: faker.lorem.words(),
            description: faker.lorem.paragraph(),
        }
    }
}
