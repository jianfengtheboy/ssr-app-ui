import Sha256 from 'js-sha256'

export const encryptSha256 = data => {
	return Sha256.sha256(data)
}
