// t chứa mấy hàm xài chung hỗ trợ ở đây, kiểu ulti ấy
export function getPageNumbers(current: number, total: number): (number | '...')[] {
  const delta = 2
  const range: (number | '...')[] = []

  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  const pages = []

  for (let i = left; i <= right; i++) {
    pages.push(i)
  }

  if (left > 2) {
    range.push(1, '...')
  } else {
    for (let i = 1; i < left; i++) {
      range.push(i)
    }
  }

  range.push(...pages)

  if (right < total - 1) {
    range.push('...', total)
  } else {
    for (let i = right + 1; i <= total; i++) {
      range.push(i)
    }
  }

  return range
}
