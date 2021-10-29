import Prando from 'prando';
import YAML from 'yaml';
import fs from 'fs';

const rand = new Prando(42);


/**
 * Produce a structure that looks like
 * {
 *      "trait1": {
 *          "maxRoll": 12,
 *          "values": {
 *              "value1": {
 *                  "low": 0,
 *                  "high": 4
 *              },
 *              "value2": {
 *                  "low": 4,
 *                  "high": 12
 *              }
 *          }
 *      }
 * }
 * @param rawTraitData
 */
const transformTraits = (rawTraitData) => {
    const data = {};

    for (const trait in rawTraitData) {
        const traits = rawTraitData[trait]['values'];
        const traitData = {
            values: {}
        };

        // Compute roll offsets for every value in the trait
        let offset = 0;
        for (const value in traits) {
            const weight = traits[value];
            const valueData = {
                low: offset,
                high: offset+weight,
            }
            offset += weight;
            traitData.values[value] = valueData;
        }

        // The offset is currently the largest value, thus the maximum roll
        traitData.maxRoll = offset;

        // Finally set the trait data on the parent object
        data[trait] = traitData;
    }

    return data;
};

const selectTraits = (traitTable) => {
    const selectedTraits = {};

    for (const trait in traitTable) {
        const maxRoll = traitTable[trait].maxRoll;
        const traits = traitTable[trait].values;
        const roll = rand.next(0, maxRoll);

        // Find the value where the roll is within the min,max bounds
        for (const value in traits) {
            const {low, high} = traits[value];
            if (low <= roll && roll < high) {
                selectedTraits[trait] = value;
                break;  // Move on to the next trait
            }
        }
    }

    return selectedTraits;
}

const generate = () => {
    const traitDataRaw = fs.readFileSync('traits.yml.example', 'utf8');
    const traitData = YAML.parse(traitDataRaw)['traits'];
    const traitTable = transformTraits(traitData);

    for (let i = 0; i++ < 50;) {
        console.log(selectTraits(traitTable));
    }
};

generate();