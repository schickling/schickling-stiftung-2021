import { paramCase } from 'change-case'

export function escapeAndParamCase(str: string): string {
  return paramCase(replaceUmlaute(str))
}

function replaceUmlaute(str: string): string {
  const umlautMap = {
    Ü: 'UE',
    Ä: 'AE',
    Ö: 'OE',
    ü: 'ue',
    ä: 'ae',
    ö: 'oe',
    ß: 'ss',
  } as any

  return str
    .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
      const big = umlautMap[a.slice(0, 1)]
      return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1)
    })
    .replace(
      new RegExp('[' + Object.keys(umlautMap).join('|') + ']', 'g'),
      (a) => umlautMap[a],
    )
}

export const unique = <X>(xs: X[]): X[] => Array.from(new Set(xs))
