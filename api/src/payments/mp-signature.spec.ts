import { createHmac } from 'crypto'
import { validMpSignature } from './mp-signature'

describe('validMpSignature', () => {
  const sign = (manifest: string) => createHmac('sha256', 'secreto').update(manifest).digest('hex')
  const v1 = sign('id:123;request-id:req-1;ts:1700;')

  it('acepta una firma correcta', () => {
    expect(validMpSignature('secreto', `ts=1700,v1=${v1}`, 'req-1', '123')).toBe(true)
  })

  it('rechaza firmas alteradas, de otro pago o faltantes', () => {
    expect(validMpSignature('otro', `ts=1700,v1=${v1}`, 'req-1', '123')).toBe(false)
    expect(validMpSignature('secreto', `ts=1700,v1=${v1}`, 'req-1', '999')).toBe(false)
    expect(validMpSignature('secreto', `ts=1701,v1=${v1}`, 'req-1', '123')).toBe(false)
    expect(validMpSignature('secreto', undefined, 'req-1', '123')).toBe(false)
  })
})
