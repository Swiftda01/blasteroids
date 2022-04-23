import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

const serverUrl = environment.server_url;
const appId = environment.app_id;
const tokenAddress = environment.token_address;
const chain = environment.chain;

declare var Moralis;
Moralis.start({ serverUrl, appId });

@Injectable({
  providedIn: 'root'
})
export class MoralisService {
  user: any;

  constructor() { }

  async authenticateCurrentUser() {
    await this.getCurrentUser();
    if (!this.user) this.user = await Moralis.authenticate();
    return this.user;
  }

  async logOutUser() {
    await Moralis.User.logOut();
  }

  async getCurrentUser() {
    this.user = await Moralis.User.current();
    return this.user
  }

  async getNftsOwned() {
    return Moralis.Web3API.account.getNFTsForContract({
      address: this._getUserAccount(),
      token_address: tokenAddress,
      chain
    }).then(nfts => {
      for (const [_nftId, nft] of Object.entries(nfts.result)) {
        nft['metadata'] = JSON.parse(nft['metadata'])
      }

      return nfts.result;
    });
  }

  private _getUserAccount() {
    return this.user.get('accounts')[0];
  }
}
