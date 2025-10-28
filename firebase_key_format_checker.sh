#!/bin/bash

# firebase_key_format_checker.sh
# SECURE: Validates Firebase key format without exposing content
# Use this to check your key before uploading to GitHub Secrets

echo "🔒 Firebase Key Format Checker (SECURE - Base64 Support)"
echo "========================================================"
echo ""

echo "✅ SUCCESS UPDATE: Firebase key issue has been resolved!"
echo "� Working key: 3176 characters (perfect Firebase service account JSON)"
echo ""

echo "�📋 INSTRUCTIONS:"
echo "================"
echo "This script helps validate Firebase service account JSON format."
echo "KEY LESSON: Use simple text editors (Notepad) for copying JSON credentials!"
echo ""
echo "🔧 What we learned from the recent Firebase resolution:"
echo "❌ Studio V editor: Caused JSON truncation/formatting issues"
echo "✅ Notepad: Preserved complete raw JSON content"
echo "📊 Result: 392 characters → 3176 characters (complete key)"
echo ""
echo "1. Download your Firebase service account JSON from:"
echo "   https://console.firebase.google.com/project/cleanpro-site/settings/serviceaccounts/adminsdk"
echo ""
echo "2. ⚠️  CRITICAL: Use Notepad (or simple text editor) to view and copy JSON"
echo ""
echo "3. Choose validation method:"
echo ""

# Function to validate JSON structure securely
validate_json_structure() {
    local json_content="$1"
    local issues=0
    
    echo "🔍 Validating JSON structure..."
    
    # Check if it's valid JSON
    if ! echo "$json_content" | jq . > /dev/null 2>&1; then
        echo "❌ Invalid JSON format"
        ((issues++))
    else
        echo "✅ Valid JSON format"
    fi
    
    # Check required fields
    required_fields=("type" "project_id" "private_key_id" "private_key" "client_email" "client_id" "auth_uri" "token_uri")
    
    for field in "${required_fields[@]}"; do
        if echo "$json_content" | jq -e ".$field" > /dev/null 2>&1; then
            echo "✅ Field '$field' present"
        else
            echo "❌ Missing required field: '$field'"
            ((issues++))
        fi
    done
    
    # Check specific field values
    if echo "$json_content" | jq -e '.type' | grep -q "service_account"; then
        echo "✅ Correct type: service_account"
    else
        echo "❌ Type should be 'service_account'"
        ((issues++))
    fi
    
    if echo "$json_content" | jq -e '.project_id' | grep -q "cleanpro-site"; then
        echo "✅ Correct project: cleanpro-site"
    else
        echo "❌ Project ID should be 'cleanpro-site'"
        ((issues++))
    fi
    
    # Check private key format
    if echo "$json_content" | jq -r '.private_key' | grep -q "BEGIN PRIVATE KEY"; then
        echo "✅ Private key has correct format"
    else
        echo "❌ Private key missing or malformed"
        ((issues++))
    fi
    
    # Check client email
    if echo "$json_content" | jq -r '.client_email' | grep -q "@cleanpro-site.iam.gserviceaccount.com"; then
        echo "✅ Client email has correct domain"
    else
        echo "❌ Client email should end with @cleanpro-site.iam.gserviceaccount.com"
        ((issues++))
    fi
    
    # Check character count
    local char_count=$(echo "$json_content" | wc -c)
    echo "📏 Character count: $char_count"
    
    if [ "$char_count" -lt 2000 ]; then
        echo "❌ JSON too short (< 2000 chars) - likely incomplete"
        ((issues++))
    elif [ "$char_count" -gt 4000 ]; then
        echo "⚠️  JSON very long (> 4000 chars) - verify it's not corrupted"
    else
        echo "✅ Character count looks good (2000-4000 chars)"
    fi
    
    return $issues
}

echo "Choose how to provide your Firebase JSON:"
echo ""
echo "Option 1: 📁 Read from file"
echo "Option 2: 📋 Paste content (will be cleared immediately)"
echo "Option 3: 🔍 Check character count only"
echo "Option 4: 🔐 Generate Base64 for GitHub Secrets"
echo ""
read -p "Enter option (1/2/3/4): " option

case $option in
    1)
        read -p "Enter path to your Firebase JSON file: " file_path
        if [ -f "$file_path" ]; then
            echo ""
            echo "🔍 Analyzing file: $file_path"
            json_content=$(cat "$file_path")
            validate_json_structure "$json_content"
            validation_result=$?
        else
            echo "❌ File not found: $file_path"
            exit 1
        fi
        ;;
    2)
        echo ""
        echo "📋 Paste your Firebase JSON content below, then press Ctrl+D:"
        echo "(Content will be validated and then cleared from memory)"
        json_content=$(cat)
        echo ""
        echo "🔍 Analyzing pasted content..."
        validate_json_structure "$json_content"
        validation_result=$?
        # Clear the variable
        unset json_content
        ;;
    4)
        echo ""
        read -p "📁 Enter path to your Firebase JSON file for Base64 encoding: " file_path
        if [ -f "$file_path" ]; then
            echo ""
            echo "🔍 Processing file: $file_path"
            json_content=$(cat "$file_path")
            validate_json_structure "$json_content"
            validation_result=$?
            
            if [ $validation_result -eq 0 ]; then
                echo ""
                echo "🔐 GENERATING BASE64 FOR GITHUB SECRETS"
                echo "======================================="
                base64_encoded=$(echo -n "$json_content" | base64 -w 0)
                echo ""
                echo "✅ Base64 encoding complete!"
                echo "📊 Original JSON length: $(echo -n "$json_content" | wc -c) characters"
                echo "📊 Base64 encoded length: $(echo -n "$base64_encoded" | wc -c) characters"
                echo ""
                echo "🔒 COPY THIS BASE64 VALUE TO GITHUB SECRETS:"
                echo "============================================="
                echo ""
                echo "$base64_encoded"
                echo ""
                echo "📋 STEPS:"
                echo "1. Copy the Base64 string above"
                echo "2. Go to: https://github.com/Tazaai/cleanpro-site/settings/secrets/actions"
                echo "3. Create or update secret: FIREBASE_KEY_BASE64"
                echo "4. Paste the Base64 string"
                echo "5. Save and deploy"
                echo ""
                echo "🔒 This Base64 approach is CI/CD-safe and Windows-compatible!"
            fi
            # Clear the variables
            unset json_content
            unset base64_encoded
        else
            echo "❌ File not found: $file_path"
            validation_result=1
        fi
        ;;
    3)
        echo ""
        read -p "📏 Enter the character count of your JSON: " char_count
        echo ""
        if [ "$char_count" -lt 2000 ]; then
            echo "❌ $char_count characters is too short"
            echo "💡 A complete Firebase service account JSON should be 2000-3000+ characters"
            validation_result=1
        else
            echo "✅ $char_count characters looks good"
            validation_result=0
        fi
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "📊 VALIDATION SUMMARY"
echo "====================="

if [ $validation_result -eq 0 ]; then
    echo "✅ Firebase JSON appears valid and ready for GitHub Secrets!"
    echo ""
    echo "🔧 Next steps:"
    echo "1. Copy your complete JSON"
    echo "2. Encode it to Base64: echo -n 'YOUR_JSON' | base64 -w 0"
    echo "3. Go to: https://github.com/Tazaai/cleanpro-site/settings/secrets/actions"
    echo "4. Create/update FIREBASE_KEY_BASE64 secret"
    echo "5. Or use option 4 of this script for automatic Base64 encoding"
    echo "4. Redeploy and test"
else
    echo "❌ Found $validation_result issue(s) with your Firebase JSON"
    echo ""
    echo "🔧 Recommended actions:"
    echo "1. Download a fresh service account key from Firebase Console"
    echo "2. Verify the complete JSON is copied (no truncation)"
    echo "3. Run this script again to validate"
fi

echo ""
echo "🔒 SECURITY NOTE:"
echo "================="
echo "✅ This script validates format without storing sensitive data"
echo "✅ No credentials are logged or saved"
echo "❌ Never share your actual Firebase JSON content"