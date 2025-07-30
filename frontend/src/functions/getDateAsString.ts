function getDateAsString({ D, M, Y}: { D: number, M: number, Y: number }) {
    const Dstr = D.toString(), Mstr = M.toString(), Ystr = Y.toString()
    return `${Dstr.length === 1 ? `0${Dstr}`: `${Dstr}`}-${Mstr.length === 1 ? `0${Mstr}`: `${Mstr}`}-${Ystr}`
}

export default getDateAsString