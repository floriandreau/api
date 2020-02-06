<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="assets/img/icon.png" type="image/x-icon">
    <title>Sode'Map</title>
    <link rel="stylesheet" href="leaflet.css"/>
    <link rel="stylesheet" href="style.css"/>
    <link rel="stylesheet" href="media.css" media="all"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="js/leaflet.js"></script>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

    <!-- HERE ~ @see https://developer.here.com/ -->
    <script type="text/javascript" src="js/geocoding_suggestions.js"></script>
    <script type="text/javascript" src="js/geocoding_position.js"></script>

    <!-- BOOTSTRAP ~ @see https://getbootstrap.com/docs/3.3/getting-started/ -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</head>
<!-- <body>
    <div id="formulaire">fze</div>

    <button id = "find-me">Montrer ma localisation</button><br/>
<p id = "status"></p>
<a id = "map-link" target="_blank"></a>


    <script src="script.js"></script>
</body> -->

<body id="body">
    <div class="container">
        <div class="row">
            <div class="entete">
                <img class="logo" src="assets/img/sodemap.png" alt="sodemap">
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <span class="input-group-addon" id="sizing-addon1">Où ?</span>
                    <input type="text" id="auto-complete" class="form-control" placeholder="Ex: 37 avenue de Gramont, Vichy" onkeypress="removeHide()" onkeyup="return autoCompleteListener(this, event);" aria-describedby="places-search">
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading hide">Suggestions: </div>
                    <ul class="list-group"></ul>
                </div>
            </div>
            
            <div class="col-md-6">
                 <div class="panel panel-default">
                    <div class="panel-body" id="resum">
                        <div id="location">Retrouvez les musées, gares et station-essences de la ville de votre choix avec les alentours</div>
                    </div>
                </div> 
                <div class="panel panel-default" id="legende">
                   
                    <ul id="mark">
                        <li>
                            <img class="marqueur" src="js/images/musee.png" alt="Musée">
                            <p>Musées</p>
                        </li>
                        <li>
                            <img class="marqueur" src="js/images/carburant.png" alt="Carburant">
                            <p>Station</p>
                        </li>
                        <li>
                            <img class="marqueur" src="js/images/gare.png" alt="Gare">
                            <p>Gares</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Le conteneur de notre carte (avec une contrainte CSS pour la taille) -->
    <div id="macarte">
    </div>
        <div id="fondOrange" class="hide">
            <p id="chargement"></p>
            <div class="loader"></div> 
        </div>


    <script type="text/javascript">

    </script>

</body>

</html>