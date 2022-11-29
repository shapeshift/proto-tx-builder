import { AminoConverters } from '@cosmjs/stargate';
import { osmosisAminoConverters } from 'osmojs'

export function createAminoConverters(): AminoConverters {
    return osmosisAminoConverters
}
