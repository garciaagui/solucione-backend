import { CreateComplaintData } from '@/types/complaint'
import { BadRequestException } from '@/utils/exceptions'
import { API_KEY, INITIAL_PROMPT } from '@/utils/gemini'
import { GoogleGenAI } from '@google/genai'

export default class GeminiService {
  private gemini: GoogleGenAI

  constructor() {
    this.gemini = new GoogleGenAI({ apiKey: API_KEY })
  }

  public async checkProfanity(
    fields: Omit<CreateComplaintData, 'userId'>,
    imageBuffer: Buffer,
  ): Promise<void> {
    const base64Image = imageBuffer.toString('base64')

    const textContent = `${INITIAL_PROMPT}

    Campos a serem avaliados:
      - "Título": "${fields.title}",
      - "Descrição": "${fields.description}",
      - "Bairro": "${fields.neighborhood}",
      - "Rua": "${fields.street}",
      - "Referência": "${fields.addressReference || 'Não informado'}"`

    try {
      const response = await this.gemini.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            parts: [
              { text: textContent },
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64Image,
                },
              },
            ],
          },
        ],
      })

      const result = response.text?.toLowerCase().trim() || ''

      if (result.includes('true')) {
        throw new BadRequestException(
          'Um ou mais campos contêm conteúdo impróprio ou ofensivo. Por favor, revise.',
        )
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new BadRequestException('Erro ao validar conteúdo. Por favor, tente novamente.')
    }
  }
}
