angular.module("MailServiceHttp",[])
.factory("mailService",function($http){

    var URL_API = "http://localhost/api/";

    return{
        getDossiers: function(){
            var promesse = $http.get(URL_API + "dossiers");
            var resultat = [];
            
            promesse.then(function(reponse){
                angular.extend(resultat,reponse.data);
            },function(erreur){
                alert("Erreur" + erreur.status + " dans la récupération des dossiers : " + erreur.data)
            })
            return resultat;
        },
        getDossier: function(valDossier){
            var promesse = $http.get(URL_API + "dossiers/" + valDossier);
            var resultat = {};

            promesse.then(function(reponse){
                angular.extend(resultat,reponse.data);
            }),function(erreur){
                alert("Erreur" + erreur.status + " dans la récupération d'un dossiers : " + erreur.data)
            }
            return resultat
        },
        getMail: function(valDossier,idMail){
            var promesse = $http.get(URL_API + "dossiers/" + valDossier + "/" + idMail);
            var resultat = {}

            promesse.then(function(reponse){
                angular.extend(resultat,reponse.data);
            }),function(erreur){
                alert("Erreur" + erreur.status + " dans la récupération du mail : " + erreur.data)
            }

            return resultat
        },
        envoiMail: function(mail){
            var promesse = $http.post(URL_API + "envoi" , mail);

            promesse.then(function(reponse){},function(erreur){
                alert("Erreur" + erreur.status + " dans l'envoie du mail': " + erreur.data)
            })

        }
    }

})