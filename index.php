<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    
    <!-- HERE ~ @see https://developer.here.com/ -->
    <script type="text/javascript" src="js/geocoding_suggestions.js"></script>
    <script type="text/javascript" src="js/geocoding_position.js"></script>

    <!-- BOOTSTRAP ~ @see https://getbootstrap.com/docs/3.3/getting-started/ -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</head>
<!-- <body>
    <div id="formulaire">fze</div>

    <button id = "find-me">Montrer ma localisation</button><br/>
<p id = "status"></p>
<a id = "map-link" target="_blank"></a>


    <script src="script.js"></script>
</body> -->

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <span class="input-group-addon" id="sizing-addon1">Où ?</span>
                    <input type="text" id="auto-complete" class="form-control" placeholder="Ex: 37 avenue de Gramont, Vichy" onkeyup="return autoCompleteListener(this, event);" aria-describedby="places-search">
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">Suggestions :</div>       
                    <ul class="list-group"></ul>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Localisation: </h3>
                    </div>
                    <div class="panel-body">
                        <div id="location"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>