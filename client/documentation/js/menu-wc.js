'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' : 'data-target="#xs-components-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' :
                                            'id="xs-components-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' }>
                                            <li class="link">
                                                <a href="components/AddPostComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPostComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlertmsgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertmsgComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BottomInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BottomInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BrowseRouteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrowseRouteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommentSectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentSectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForumWallComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForumWallComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InitialPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InitialPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageOrdersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageOrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapPlannerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapPlannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageAlertComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageAlertComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotAvailableFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotAvailableFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PetCardViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetCardViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PetOwnerProfileDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetOwnerProfileDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PetSitterDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetSitterDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PetSitterServiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetSitterServiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopServiceCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopServiceCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecognitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecognitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReviewFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScheduleListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScheduleListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchResultsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchResultsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchSitterServicesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchSitterServicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchVersion2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchVersion2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchpositivekeywordsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchpositivekeywordsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SharedFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SharedFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrackerOrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrackerOrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadImageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadImageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserformComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserformComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' : 'data-target="#xs-injectables-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' :
                                        'id="xs-injectables-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SocketService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocketService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' : 'data-target="#xs-pipes-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' :
                                            'id="xs-pipes-links-module-AppModule-eb64ab7b3267d5baf69c81bb609c7795c4e64fa1188590c28dd933eacc7f48d4575147a26712d29eaa7127c53fcd1daa7166fba1276627ff26c2ee755fd0a492"' }>
                                            <li class="link">
                                                <a href="pipes/ChunkPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChunkPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ModalComponent.html" data-type="entity-link" >ModalComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CalendarDay.html" data-type="entity-link" >CalendarDay</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentItem.html" data-type="entity-link" >CommentItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/event.html" data-type="entity-link" >event</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostItem.html" data-type="entity-link" >PostItem</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CognitoService.html" data-type="entity-link" >CognitoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService-1.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileUploadService.html" data-type="entity-link" >FileUploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeneralService.html" data-type="entity-link" >GeneralService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeocodingService.html" data-type="entity-link" >GeocodingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MapsService.html" data-type="entity-link" >MapsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationService.html" data-type="entity-link" >NavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderService.html" data-type="entity-link" >OrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PetOwnerService.html" data-type="entity-link" >PetOwnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PetService.html" data-type="entity-link" >PetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PetSitterService.html" data-type="entity-link" >PetSitterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewService.html" data-type="entity-link" >ReviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchServiceService.html" data-type="entity-link" >SearchServiceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/InterceptorService.html" data-type="entity-link" >InterceptorService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/CognitoGuard.html" data-type="entity-link" >CognitoGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BoardInterface.html" data-type="entity-link" >BoardInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CalClass.html" data-type="entity-link" >CalClass</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommentInterface.html" data-type="entity-link" >CommentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomFieldModel.html" data-type="entity-link" >CustomFieldModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INotAvailable.html" data-type="entity-link" >INotAvailable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrder.html" data-type="entity-link" >IOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrder-1.html" data-type="entity-link" >IOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderList.html" data-type="entity-link" >IOrderList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPet.html" data-type="entity-link" >IPet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPet-1.html" data-type="entity-link" >IPet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPet-2.html" data-type="entity-link" >IPet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPetCategory.html" data-type="entity-link" >IPetCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPetCategory-1.html" data-type="entity-link" >IPetCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPetOwner.html" data-type="entity-link" >IPetOwner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPetSitter.html" data-type="entity-link" >IPetSitter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPetSitterID.html" data-type="entity-link" >IPetSitterID</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServiceCategory.html" data-type="entity-link" >IServiceCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServiceCategory-1.html" data-type="entity-link" >IServiceCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServiceFind.html" data-type="entity-link" >IServiceFind</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServiceFind-1.html" data-type="entity-link" >IServiceFind</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServiceFind-2.html" data-type="entity-link" >IServiceFind</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser-1.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser-2.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Location.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModalConfig.html" data-type="entity-link" >ModalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModalConfig-1.html" data-type="entity-link" >ModalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/petCategory.html" data-type="entity-link" >petCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/petCategory-1.html" data-type="entity-link" >petCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostInterface.html" data-type="entity-link" >PostInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RdsUserServices.html" data-type="entity-link" >RdsUserServices</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Review.html" data-type="entity-link" >Review</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/serviceCategory.html" data-type="entity-link" >serviceCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceInterface.html" data-type="entity-link" >ServiceInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});