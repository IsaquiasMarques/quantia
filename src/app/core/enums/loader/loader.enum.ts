export enum LoaderActionEnum{
    USER_AUTHENTICATION = '[authentication] login register recovery',

    GETTING_USER_DATA = '[user-authenticated] get user meta-datas: plan and settings ',

    SETTINGS = '[user-account] get user settings meta-data',
    PLAN = '[user-account] get user plan meta-data',

    // objectives
    CARD_OBJECTIVES = '[admin-account] get card objectives',
    CREATE_CARD_OBJECTIVE = '[admin-account] create card objective',

    // icons
    ICONS = '[admin-account] get icons',
    CREATE_ICON = '[admin-account] create icon',

    // currencies
    CURRENCIES = '[admin-account] get currencies',
    CREATE_CURRENCY = '[admin-account] create currencies',

    //cards
    CARDS = '[user-account] get user cards meta-data',
    CREATE_CARD = '[user-account] create user card',
    EDIT_CARD = '[user-account] edit user card',

    //goals
    GOALS = '[user-account] get user goals meta-data',
    CREATE_GOAL = '[user-account] create card goal',

    //transactions
    TRANSACTIONS = '[user-account] get user transactions meta-data',
}