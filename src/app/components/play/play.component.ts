import { Component, ViewChild } from '@angular/core';
import { MoralisService } from '../../services/moralis/moralis.service'
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public user: any;
  public walletAddress: string;
  public shortenedWalletAddress: string;
  public nfts: any = [];
  selectedShip: any = null;
  gameInProgress: boolean = false;

  constructor(
    private moralisService: MoralisService,
    private router: Router
  ) { }

  ngOnInit() {
    this._initializeComponent();
  }

  startGame() {
    this.gameInProgress = true;
  }

  selected(ship) {
    this.selectedShip = ship;
    console.log(this.selectedShip);
  }

  async logOut() {
    this.moralisService.logOutUser().then(() => {
      this._goToLandingPage()
    });
  }

  private async _initializeComponent() {
    await this._authenticateCurrentUser();
    await this._getNftsOwned();
  }

  private async _authenticateCurrentUser() {
    this.moralisService.authenticateCurrentUser().then(user => {
      this.user = user;
      this.walletAddress = this.user.attributes.ethAddress;
      this.shortenedWalletAddress = this._shortened(this.walletAddress)
    });
  }

  private _shortened(address: string) {
    const addressLength = address.length;

    return address.substring(0, 6) + '...' +
      address.substring(addressLength - 4, addressLength);
  }

  private async _getNftsOwned() {
    await this.moralisService.getNftsOwned().then(nfts => {
      console.log('nfts: ', nfts);
      this.nfts = nfts;
    });
  }

  private _goToLandingPage() {
    this.router.navigate(['/landing'])
  }
}
