import Prando from 'prando';
import YAML from 'yaml';
import fs from 'fs';

const generate = () => {
    const traitDataRaw = fs.readFileSync('traits.yml.example', 'utf8');
    const traitData = YAML.parse(traitDataRaw);
};

generate();