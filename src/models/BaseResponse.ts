

export default class BaseResponse {


    constructor(props:

        {success?: boolean,

        message?: string,

        statusCode?: number,

        data?: any
    }) {

          this.data = props.data
          this.success = props.success === undefined ? true : props.success
          this.statusCode = props.statusCode || 200
          this.message = props.message || 'request was successful'

    }

    success: boolean

    message: string

    statusCode: number

    data?: any

}