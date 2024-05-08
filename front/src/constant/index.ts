// description : Navigation URL PATH 
export const SNS_PATH = '/sns/:accessToken/:expires';
export const AUTH_PATH = '/authentication';
export const SERVICE_PATH = '/service';
export const LOCAL_PATH = 'local';
export const RATIO_PATH = 'ratio';
export const QNA_PATH = 'qna';
export const QNA_WRITE_PATH = 'write';
export const QNA_DETAIL_PATH = ':receptionNumber';
export const QNA_UPDATE_PATH = 'update/:receptionNumber';

// description: Navigation 절대 URL PATH 
export const AUTH_ABSOLUTE_PATH = AUTH_PATH;
export const LOCAL_ABSOLUTE_PATH = `${SERVICE_PATH}/${LOCAL_PATH}`;
export const RATIO_ABSOLUTE_PATH = `${SERVICE_PATH}/${RATIO_PATH}`;
export const QNA_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_PATH}`;
export const QNA_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_PATH}/${QNA_WRITE_PATH}`;
export const QNA_DETAIL_ABSOLUTE_PATH = (receptionNumber: string | number) => `${SERVICE_PATH}/${QNA_PATH}/${receptionNumber}`;
export const QNA_UPDATE_ABSOLUTE_PATH = (receptionNumber: string | number) => `${SERVICE_PATH}/${QNA_PATH}/update/${receptionNumber}`;

// description: API URL PATH 
export const SERVER_DOMAIN_URL = 'http://localhost:4000';
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;

export const SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
export const ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/id-check`;
export const EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth`;
export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth-check`;
export const SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-up`;

export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;

export const GET_SIGN_IN_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;

export const SERVER_BOARD_MODULE_URL = `${SERVER_API_URL}/board`;

export const POST_BOARD_REQUEST_URL = `${SERVER_BOARD_MODULE_URL}/`;

export const POST_COMMENT_REQUEST_URL = (receptionNumber: number | string) => `${SERVER_BOARD_MODULE_URL}/${receptionNumber}/comment`;

export const GET_BOARD_LIST_URL = `${SERVER_BOARD_MODULE_URL}/list`;

export const GET_SEARCH_BOARD_LIST_URL = (searchWord: string) => `${SERVER_BOARD_MODULE_URL}/list/${searchWord}`;
export const GET_BOARD_URL = (receptionNumber: number | string) => `${SERVER_BOARD_MODULE_URL}/${receptionNumber}`;
export const PUT_BOARD_URL = (receptionNumber: number | string) => `${SERVER_BOARD_MODULE_URL}/${receptionNumber}`;
export const INCREASE_VIEW_COUNT_URL = (receptionNumber: number | string) => `${SERVER_BOARD_MODULE_URL}/${receptionNumber}/increase-view-count`;
export const DELETE_BOARD_URL = (receptionNumber: number | string) => `${SERVER_BOARD_MODULE_URL}/${receptionNumber}`;

// description: 게시물 상수
export const COUNT_PER_PAGE = 10;
export const COUNT_PER_SECTION = 10;