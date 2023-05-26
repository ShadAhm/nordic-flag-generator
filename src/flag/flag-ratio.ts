export class FlagRatio {
    static namedRatios: Record<string, number> = {
        'sweden': 1.6,
        'denmark': 1.321,
        'norway': 1.375,
        'iceland': 1.389,
        'finland': 1.636,
    };

    // given a ratio number, return the name of the ratio
    static getRatioName(aspectRatio: number): string {
        for (const [name, ratio] of Object.entries(this.namedRatios)) {
            if (this.compareFloats(aspectRatio, ratio)) {
                return name;
            }
        }
        return 'unknown';
    }

    // given a ratio name, return the ratio number
    static getRatioNumber(ratioName: string): number {
        return this.namedRatios[ratioName];
    }

    static compareFloats(a: number, b: number, precision: number = 0.001): boolean {
        return Math.abs(a - b) < precision;
    }
}