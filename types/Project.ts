export interface IProject {
    name: string;
    color?: COLOR;
    isFavorite?: boolean;
    view?: VIEW;
}

export enum VIEW {
    LIST = 'List',
    BOARD = 'Board',
    CALENDAR = 'Calendar', // not available in free version
}

export enum COLOR {
    BERRY_RED = 'Berry Red',
    RED = 'Red',
    ORANGE = 'Orange',
    YELLOW = 'Yellow',
    OLIVE_GREEN = 'Olive Green',
    LIME_GREEN = 'Lime Green',
    GREEN = 'Green',
    MINT_GREEN = 'Mint Green',
    TEAL = 'Teal',
    SKY_BLUE = 'Sky Blue',
    LIGHT_BLUE = 'Light Blue',
    BLUE = 'Blue',
    GRAPE = 'Grape',
    VIOLET = 'Violet',
    LAVENDER = 'Lavender',
    MAGENTA = 'Magenta',
    SALMON = 'Salmon',
    CHARCOAL = 'Charcoal',
    GREY = 'Grey',
    TAUPE = 'Taupe'
}
