import fs from 'fs'

import { Adapter } from '../Low.js'
import { Writer } from '../steno'

export class TextFile implements Adapter<string> {
  #filename: string
  #writer: Writer

  constructor(filename: string) {
    this.#filename = filename
    this.#writer = new Writer(filename)
  }

  async read(): Promise<string | null> {
    let data

    try {
      data = await fs.promises.readFile(this.#filename, 'utf-8')
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
        return null
      }
      throw e
    }

    return data
  }

  write(str: string): Promise<void> {
    return this.#writer.write(str)
  }
}
