export class PaddingUtil {

    public static paddingSize = new Array(20).fill(0, 0, 20);

    private static registered = new Map<string, Padding>();

    public static register(...paddings: Padding[]) {
        for (const padding of paddings)
            this.registered.set(padding.name, padding);
    }

    public static reservePadding(...sizes: (string | number)[]) {
        for (let i = 0; i < sizes.length; i++) {
            let value: number;

            let size: string | number = sizes[i];
            if (typeof size === 'string')
                value = size.length;
            else
                value = size;

            this.paddingSize[i] = Math.max(this.paddingSize[i], value);
        }
    }

    public static pad(scope: string, index: number, padding: PaddingDefaults | string) {
        if (!this.registered.has(padding)) throw "Failed to find padding type " + padding;

        return this.registered.get(padding).pad(scope, index);
    }

}

export abstract class Padding {

    abstract name: string;

    pad(scope: string, index: number): string {
        let size = PaddingUtil.paddingSize[index];

        if (scope.length > size) {
            PaddingUtil.paddingSize[index] = scope.length;
            size = scope.length;
        }

        return this.padToSize(scope, size);
    }

    abstract padToSize(scope: string, size: number);

}

export const NonePadding = () => new class extends Padding {
    name: string = "none";

    padToSize(scope: string, size: number) {
        return scope;
    }

}

export const LeftPadding = (name: string, character: string) => new class extends Padding {
    name: string = name;

    padToSize(scope: string, size: number) {
        return scope.padStart(size, character);
    }

}

export const RightPadding = (name: string, character: string) => new class extends Padding {
    name: string = name;

    padToSize(scope: string, size: number) {
        return scope.padEnd(size, character);
    }

}

export const CenterPadding = (name: string, character: string) => new class extends Padding {
    name: string = name;

    padToSize(scope: string, size: number) {
        let i = 0;
        while (scope.length < size) {
            if (i % 2 == 0) {
                scope = character + scope;
            } else {
                scope = scope + character;
            }
            i++;
        }
        return scope;
    }

}

type PaddingDefaults =
    'leftDot'   | 'leftSpace'   | 'leftUnderscore'  |
    'rightDot'  | 'rightSpace'  | 'rightUnderscore' |
    'centerDot' | 'centerSpace' | 'centerUnderscore';

// Register default padding types
PaddingUtil.register(
    NonePadding(),

    LeftPadding("leftDot", "."),
    LeftPadding("leftSpace", " "),
    LeftPadding("leftUnderscore", "_"),

    RightPadding("rightDot", "."),
    RightPadding("rightSpace", " "),
    RightPadding("rightUnderscore", "_"),

    CenterPadding("centerDot", "."),
    CenterPadding("centerSpace", " "),
    CenterPadding("centerUnderscore", "_"),
);