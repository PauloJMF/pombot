export interface IOpenAiConfig {
  organizationID: string
  apiKey: string
}

const OpenAiConfig: IOpenAiConfig = {
  organizationID: process.env.OPENAI_ORGANIZATION_ID as string,
  apiKey: process.env.OPENAI_API_KEY as string
}
export default OpenAiConfig
