// t chứa mấy hàm xài chung hỗ trợ ở đây, kiểu ulti ấy
export function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 1) return [1]

  const delta = 2
  const range: (number | '...')[] = []

  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  const pages: number[] = []
  for (let i = left; i <= right; i++) {
    pages.push(i)
  }

  // Head
  if (left > 2) {
    range.push(1, '...')
  } else {
    for (let i = 1; i < left; i++) {
      range.push(i)
    }
  }

  // Middle
  range.push(...pages)

  // Tail
  if (right < total - 1) {
    range.push('...', total)
  } else {
    for (let i = right + 1; i <= total; i++) {
      range.push(i)
    }
  }


  return Array.from(new Set(range))
}
